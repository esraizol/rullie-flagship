(function() {
    'use strict';

    // Utilities
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    };

    const debounce = (func, delay) => {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        };
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    // State
    const state = {
        isDesktop: window.matchMedia('(hover: hover)').matches,
        scrollY: window.scrollY,
        lastScrollY: window.scrollY,
        isMenuOpen: false,
        isSearchOpen: false
    };

    // 1. Custom Cursor System
    const initCursor = () => {
        if (!state.isDesktop) return;

        let cursor = document.getElementById('custom-cursor');
        if (!cursor) {
            cursor = document.createElement('div');
            cursor.classList.add('cursor');
            cursor.id = 'custom-cursor';
            cursor.setAttribute('aria-hidden', 'true');
            document.body.appendChild(cursor);
        }

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let isVisible = false;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            if (!isVisible) {
                cursor.classList.add('visible');
                isVisible = true;
            }
        });

        const render = () => {
            cursorX = lerp(cursorX, mouseX, 0.15);
            cursorY = lerp(cursorY, mouseY, 0.15);
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            requestAnimationFrame(render);
        };
        requestAnimationFrame(render);

        document.addEventListener('mouseover', (e) => {
            const target = e.target;
            const isLinkOrBtn = target.closest('a') || target.closest('button');
            const isProduct = target.closest('.product-card');
            const isVideo = target.closest('.editorial-video__poster');

            if (isLinkOrBtn && !isProduct && !isVideo) {
                cursor.classList.add('cursor--hover');
            } else if (isProduct) {
                cursor.classList.add('cursor--product');
            } else if (isVideo) {
                cursor.classList.add('cursor--video');
            }
        });

        document.addEventListener('mouseout', (e) => {
            cursor.classList.remove('cursor--hover', 'cursor--product', 'cursor--video');
        });
    };

    // 2. Smart Navigation
    const initNav = () => {
        const nav = document.querySelector('.nav');
        if (!nav) return;

        const handleScroll = throttle(() => {
            state.scrollY = window.scrollY;
            
            // Solid / Transparent
            if (state.scrollY > 50) {
                nav.classList.add('nav--scrolled');
                nav.classList.remove('nav--transparent');
            } else {
                nav.classList.add('nav--transparent');
                nav.classList.remove('nav--scrolled');
            }

            // Hide / Show
            const delta = state.scrollY - state.lastScrollY;
            if (Math.abs(delta) > 5) {
                if (delta > 0 && state.scrollY > 100) {
                    // Scrolling down
                    nav.classList.add('nav--hidden');
                } else {
                    // Scrolling up
                    nav.classList.remove('nav--hidden');
                }
            }
            
            if (state.scrollY < 100) {
                nav.classList.remove('nav--hidden');
            }

            state.lastScrollY = state.scrollY;
        }, 50);

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Trigger once on init
        handleScroll();
    };

    // 3. Scroll Reveal Animations
    const initReveal = () => {
        const revealElements = document.querySelectorAll('.reveal');
        if (!revealElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(el => observer.observe(el));
    };

    // 4. Horizontal Scroll (Lookbook)
    const initHorizontalScroll = () => {
        const hScrolls = document.querySelectorAll('.horizontal-scroll');
        
        hScrolls.forEach(container => {
            let isDown = false;
            let startX;
            let scrollLeft;
            let velocity = 0;
            let lastX = 0;
            let rafId;

            const momentumLoop = () => {
                if (!isDown) {
                    container.scrollLeft += velocity;
                    velocity *= 0.95; // Deceleration
                    if (Math.abs(velocity) > 0.5) {
                        rafId = requestAnimationFrame(momentumLoop);
                    } else {
                        velocity = 0;
                    }
                }
            };

            container.addEventListener('mousedown', (e) => {
                isDown = true;
                container.classList.add('active');
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
                lastX = e.pageX;
                cancelAnimationFrame(rafId);
                velocity = 0;
            });

            container.addEventListener('mouseleave', () => {
                isDown = false;
                container.classList.remove('active');
            });

            container.addEventListener('mouseup', () => {
                isDown = false;
                container.classList.remove('active');
                rafId = requestAnimationFrame(momentumLoop);
            });

            container.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2; // Scroll speed multiplier
                container.scrollLeft = scrollLeft - walk;
                
                velocity = lastX - e.pageX;
                lastX = e.pageX;
            });
            
            // Prevent click when dragging
            container.addEventListener('click', (e) => {
                if (Math.abs(velocity) > 5) {
                    e.preventDefault();
                }
            });
        });
    };

    // 5. Mobile Menu
    const initMobileMenu = () => {
        const hamburger = document.querySelector('.nav__hamburger');
        const mobileLinks = document.querySelectorAll('.nav__mobile a');

        if (!hamburger) return;

        const toggleMenu = (forceClose = false) => {
            state.isMenuOpen = forceClose ? false : !state.isMenuOpen;
            
            if (state.isMenuOpen) {
                document.body.classList.add('menu-open');
                hamburger.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                document.body.classList.remove('menu-open');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        hamburger.addEventListener('click', () => toggleMenu());

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(true));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isMenuOpen) {
                toggleMenu(true);
            }
        });
    };

    // 6. Smooth Scroll
    const initSmoothScroll = () => {
        const hashLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
        
        hashLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    if (state.isMenuOpen) {
                        const hamburger = document.querySelector('.nav__hamburger');
                        if (hamburger) hamburger.click(); // Quick and dirty close
                    }

                    const navHeight = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // 7. Image Blur-Up Loading
    const initLazyImages = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        if (!lazyImages.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    img.onload = () => {
                        img.classList.add('loaded');
                    };
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    img.src = img.dataset.src;
                    
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '300px' });

        lazyImages.forEach(img => observer.observe(img));
    };

    // 8. Parallax Effect
    const initParallax = () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        if (!parallaxElements.length) return;

        const checkDesktop = () => window.innerWidth > 1024;
        
        let ticking = false;

        const updateParallax = () => {
            if (!checkDesktop()) {
                parallaxElements.forEach(el => el.style.transform = '');
                ticking = false;
                return;
            }

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.08;
                // Calculate position relative to viewport center
                const rect = el.getBoundingClientRect();
                const elCenter = rect.top + rect.height / 2;
                const windowCenter = window.innerHeight / 2;
                const diff = elCenter - windowCenter;
                
                const yPos = diff * speed;
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
        
        window.addEventListener('resize', debounce(() => {
             updateParallax();
        }, 100));
        
        // Initial set
        updateParallax();
    };

    // 9. Back to Top
    const initBackToTop = () => {
        const bttBtn = document.querySelector('.back-to-top');
        if (!bttBtn) return;

        const toggleBtn = throttle(() => {
            if (window.scrollY > 600) {
                bttBtn.classList.add('is-visible');
            } else {
                bttBtn.classList.remove('is-visible');
            }
        }, 100);

        window.addEventListener('scroll', toggleBtn, { passive: true });

        bttBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    };

    // 10. Newsletter Form
    const initNewsletter = () => {
        const forms = document.querySelectorAll('.newsletter-form');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        forms.forEach(form => {
            const input = form.querySelector('input[type="email"]');
            if (!input) return;

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                
                if (emailRegex.test(input.value.trim())) {
                    // Success
                    form.classList.add('submitted');
                    const msg = form.querySelector('.newsletter-form__success') || document.createElement('p');
                    if (!msg.classList.contains('newsletter-form__success')) {
                        msg.classList.add('newsletter-form__success');
                        msg.textContent = 'Thank you for subscribing.';
                        form.appendChild(msg);
                    }
                    input.disabled = true;
                    const btn = form.querySelector('button');
                    if(btn) btn.disabled = true;
                } else {
                    // Error
                    input.classList.remove('shake');
                    // trigger reflow
                    void input.offsetWidth;
                    input.classList.add('shake');
                }
            });
        });
    };

    // 11. Search Overlay
    const initSearch = () => {
        const searchBtn = document.querySelector('.nav__search');
        const searchOverlay = document.querySelector('.search-overlay');
        const closeBtn = document.querySelector('.search-overlay__close');
        const searchInput = document.querySelector('.search-overlay input');

        if (!searchBtn || !searchOverlay) return;

        const toggleSearch = (forceClose = false) => {
            state.isSearchOpen = forceClose ? false : !state.isSearchOpen;
            
            if (state.isSearchOpen) {
                searchOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 200);
                }
            } else {
                searchOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        };

        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleSearch();
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => toggleSearch(true));
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && state.isSearchOpen) {
                toggleSearch(true);
            }
        });
    };

    // 12. Language Switcher
    const initLanguageSwitcher = () => {
        const langBtns = document.querySelectorAll('.lang-switcher');
        const html = document.documentElement;

        langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const currentLang = html.getAttribute('data-lang') || 'en';
                const newLang = currentLang === 'en' ? 'tr' : 'en';
                
                html.setAttribute('data-lang', newLang);
                
                // Update button text
                btn.textContent = newLang === 'en' ? 'TR' : 'EN';
            });
        });
    };

    // 13. Page Load
    const initPageLoad = () => {
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100);
    };

    // Main Init
    const init = () => {
        initCursor();
        initNav();
        initReveal();
        initHorizontalScroll();
        initMobileMenu();
        initSmoothScroll();
        initLazyImages();
        initParallax();
        initBackToTop();
        initNewsletter();
        initSearch();
        initLanguageSwitcher();
    };

    // Run on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init();
            initPageLoad();
        });
    } else {
        init();
        initPageLoad();
    }

})();
