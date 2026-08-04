'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ScrollReveal, StaggerChildren, SectionLabel } from '@/components/ui';

export default function HomePage() {
  const tHero = useTranslations('hero');
  const tSections = useTranslations('sections');
  const tProduct = useTranslations('product');
  const tNewsletter = useTranslations('newsletter');
  const tAiStudio = useTranslations('aiStudio');

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden font-body">
      {/* SECTION 1 — Hero */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-gray-900 to-black">
           {/* Placeholder for hero video/image */}
           <div className="w-full h-full opacity-60 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-800 via-gray-900 to-black" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-white font-heading text-hero leading-none tracking-tight uppercase"
          >
            {tHero('title', { fallback: 'RULLIÉ' })}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-6 text-white/80 font-heading italic text-xl md:text-2xl font-light"
          >
            {tHero('subtitle', { fallback: 'Redefining modern elegance.' })}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-12"
          >
            <Link 
              href="/shop" 
              className="inline-block border border-white/30 text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-500"
            >
              {tHero('cta', { fallback: 'Discover Collection' })}
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs tracking-widest uppercase"
        >
          <span>{tHero('scroll', { fallback: 'Scroll' })}</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* SECTION 2 — Latest Collection Drop */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <ScrollReveal>
          <SectionLabel>{tSections('latestChapter', { fallback: 'The Latest Chapter' })}</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mt-12 items-center">
            <div className="md:col-span-7">
              <div className="aspect-[3/4] w-full bg-gradient-to-br from-stone-200 to-stone-400 rounded-sm overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col items-start justify-center md:pl-10">
              <h2 className="font-heading text-display leading-tight mb-6">Nocturne<br />Collection</h2>
              <p className="text-muted text-lg font-light leading-relaxed mb-10 max-w-md">
                A symphony of shadows and light. Explore our new line of silk and statement pieces designed for the modern muse.
              </p>
              <Link 
                href="/collections/nocturne" 
                className="group flex items-center gap-4 border-b border-foreground pb-2 text-sm tracking-widest uppercase hover:text-muted transition-colors duration-300"
              >
                <span>{tProduct('exploreAll', { fallback: 'Explore Collection' })}</span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 3 — Featured Products Grid */}
      <section className="py-24 md:py-32 px-4 md:px-8 bg-warm-gray">
        <div className="max-w-7xl mx-auto">
          <SectionLabel>{tSections('featuredProducts', { fallback: 'Featured Pieces' })}</SectionLabel>
          
          <StaggerChildren className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-12">
            {[1, 2, 3, 4].map((item) => (
              <Link href={`/product/${item}`} key={item} className="group block">
                <div className="aspect-[3/4] w-full bg-gradient-to-tr from-stone-100 to-stone-300 rounded-sm overflow-hidden mb-4 relative">
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-xs tracking-widest uppercase font-medium mb-1">Silk Scarf N°{item}</h3>
                  <span className="text-sm text-muted">$240</span>
                </div>
              </Link>
            ))}
          </StaggerChildren>

          <div className="mt-16 flex justify-center">
            <Link 
              href="/shop" 
              className="inline-block border border-foreground text-foreground px-8 py-4 text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-500"
            >
              {tProduct('exploreAll', { fallback: 'Explore All' })}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Brand Manifesto */}
      <section className="py-32 md:py-48 px-4 bg-cream text-center flex flex-col items-center justify-center">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="font-heading text-3xl md:text-5xl leading-tight text-foreground mb-8 text-balance">
              "We don't follow trends.<br className="hidden md:block"/> We create signatures."
            </h2>
            <div className="w-12 h-[1px] bg-foreground/20 mb-8" />
            <p className="text-muted text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              Every RULLIÉ piece is crafted with meticulous attention to detail, 
              blending heritage techniques with avant-garde aesthetics to offer 
              a wardrobe that transcends seasons.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 5 — Editorial Feature */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row w-full min-h-[80vh]">
          <div className="w-full md:w-[70%] relative aspect-square md:aspect-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-700 to-stone-900" />
            <div className="absolute inset-0 bg-black/20" />
          </div>
          <div className="w-full md:w-[30%] bg-foreground text-background flex flex-col justify-center px-8 py-20 md:p-16">
            <ScrollReveal>
              <h3 className="font-heading text-3xl mb-6">The Art of Adornment</h3>
              <p className="text-background/70 font-light leading-relaxed mb-10 text-sm md:text-base">
                Discover the inspiration behind our latest accessories line. A journey through 
                architectural forms and fluid silk drapery.
              </p>
              <Link 
                href="/journal/art-of-adornment" 
                className="group inline-flex items-center gap-4 text-sm tracking-widest uppercase hover:text-white transition-colors duration-300"
              >
                <span>Read the Story</span>
                <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Lookbook Horizontal Scroll */}
      <section className="py-24 md:py-32 pl-4 md:pl-8 overflow-hidden bg-background">
        <SectionLabel>{tSections('lookbook', { fallback: 'Lookbook' })}</SectionLabel>
        <div className="mt-12 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 md:gap-8 pr-4 md:pr-8 pb-8 cursor-grab active:cursor-grabbing">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="snap-center shrink-0 w-[85vw] md:w-[70vw] relative group">
              <div className="aspect-[3/4] w-full bg-gradient-to-tr from-stone-200 to-stone-400 rounded-sm overflow-hidden" />
              <div className="absolute bottom-6 left-6 text-white mix-blend-difference">
                <p className="text-sm tracking-widest uppercase font-medium">Look {item}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7 — Complete the Story (Cross-sell) */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-border">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <h2 className="font-heading text-2xl md:text-3xl">{tSections('completeTheStory', { fallback: 'Complete the Story' })}</h2>
            <Link href="/shop" className="text-sm tracking-widest uppercase text-muted hover:text-foreground mt-4 md:mt-0 transition-colors">
              View All Accents
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((item) => (
              <Link href={`/product/accent-${item}`} key={item} className="group flex flex-col">
                <div className="aspect-square w-full bg-gradient-to-br from-stone-100 to-stone-200 mb-6 rounded-sm" />
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider mb-1">Signature Belt</h3>
                    <p className="text-xs text-muted">Noir / Gold</p>
                  </div>
                  <span className="text-sm">$180</span>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* SECTION 8 — Styling Guide Teaser */}
      <section className="py-24 md:py-32 bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="order-2 md:order-1">
              <SectionLabel className="mb-8">{tSections('stylingGuide', { fallback: 'Styling Guide' })}</SectionLabel>
              <h2 className="font-heading text-4xl md:text-5xl leading-tight mb-8">
                How to wear a<br/>RULLIÉ silk scarf
              </h2>
              <p className="text-muted font-light leading-relaxed mb-10 max-w-md">
                From classic neck ties to modern top styles, discover versatile ways to incorporate 
                our signature silks into your everyday repertoire.
              </p>
              <Link 
                href="/journal/styling" 
                className="inline-block border border-foreground text-foreground px-8 py-4 text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-500"
              >
                Read Guide
              </Link>
            </ScrollReveal>
            <div className="order-1 md:order-2 aspect-[4/5] bg-gradient-to-bl from-stone-300 to-stone-500 rounded-sm" />
          </div>
        </div>
      </section>

      {/* SECTION 9 — AI Studio Coming Soon */}
      <section className="py-32 px-4 bg-cream flex justify-center">
        <ScrollReveal className="max-w-4xl w-full border border-border bg-white p-8 md:p-16 rounded-sm shadow-subtle flex flex-col items-center text-center">
          <div className="mb-4 inline-block px-3 py-1 bg-black text-white text-[10px] tracking-widest uppercase rounded-full">
            {tAiStudio('comingSoon', { fallback: 'Coming Soon' })}
          </div>
          <h2 className="font-heading text-3xl md:text-5xl mb-6">{tAiStudio('title', { fallback: 'RULLIÉ AI Studio' })}</h2>
          <p className="text-muted max-w-xl mx-auto mb-12 font-light">
            {tAiStudio('description', { fallback: 'Experience hyper-personalized styling and virtual try-ons powered by next-generation artificial intelligence.' })}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-12">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-4">
                <span className="text-lg">✨</span>
              </div>
              <h4 className="text-sm tracking-widest uppercase mb-2">Virtual Try-On</h4>
              <p className="text-xs text-muted">See how pieces fit before you buy.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-4">
                <span className="text-lg">🧵</span>
              </div>
              <h4 className="text-sm tracking-widest uppercase mb-2">Custom Fit</h4>
              <p className="text-xs text-muted">Tailored measurements via scanning.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-4">
                <span className="text-lg">🎨</span>
              </div>
              <h4 className="text-sm tracking-widest uppercase mb-2">Style Advisor</h4>
              <p className="text-xs text-muted">AI-driven wardrobe recommendations.</p>
            </div>
          </div>

          <form className="w-full max-w-md flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={tAiStudio('waitlistPlaceholder', { fallback: 'Enter your email' })}
              className="flex-1 bg-transparent border-b border-border focus:border-foreground py-3 px-2 outline-none text-sm transition-colors"
            />
            <button type="submit" className="bg-foreground text-background px-6 py-3 text-sm tracking-widest uppercase hover:bg-foreground/90 transition-colors">
              {tAiStudio('waitlist', { fallback: 'Join Waitlist' })}
            </button>
          </form>
        </ScrollReveal>
      </section>

      {/* SECTION 10 — Worn By You / Social Proof */}
      <section className="py-24 md:py-32 px-4 max-w-7xl mx-auto">
        <SectionLabel className="text-center w-full block mb-12">{tSections('wornByYou', { fallback: 'Worn By You' })}</SectionLabel>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="aspect-square bg-gradient-to-br from-stone-200 to-stone-300 relative group overflow-hidden cursor-pointer rounded-sm">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent group-hover:scale-105 transition-all duration-700" />
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11 — Instagram Feed */}
      <section className="py-12 border-t border-border overflow-hidden">
        <div className="flex items-center justify-between px-4 md:px-8 mb-8 max-w-7xl mx-auto">
          <SectionLabel>{tSections('socialFeed', { fallback: '@rullié' })}</SectionLabel>
          <a href="#" className="text-xs tracking-widest uppercase hover:text-muted transition-colors">Follow Us</a>
        </div>
        <div className="flex w-full gap-2 px-2 overflow-x-auto hide-scrollbar">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <a href="#" key={item} className="shrink-0 w-48 md:w-64 aspect-square bg-gradient-to-tr from-stone-800 to-stone-600 block group relative overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                 <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">📸</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* SECTION 12 — Journal Preview */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto bg-background">
        <div className="flex justify-between items-end mb-12">
          <SectionLabel>{tSections('journal', { fallback: 'From the Journal' })}</SectionLabel>
          <Link href="/journal" className="text-sm tracking-widest uppercase hover:text-muted transition-colors hidden md:block">
            View All
          </Link>
        </div>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {[
            { tag: 'Design', title: 'The Making of Nocturne', time: '5 min read' },
            { tag: 'Culture', title: 'Modern Architecture & Fashion', time: '4 min read' },
            { tag: 'Sustainability', title: 'Our Promise to the Planet', time: '6 min read' }
          ].map((article, i) => (
            <Link href={`/journal/article-${i}`} key={i} className="group block">
              <div className="aspect-[16/9] w-full bg-gradient-to-bl from-stone-200 to-stone-400 mb-6 overflow-hidden rounded-sm">
                 <div className="w-full h-full bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <p className="text-xs uppercase tracking-widest text-muted mb-3">{article.tag}</p>
              <h3 className="font-heading text-xl mb-3 group-hover:text-muted transition-colors">{article.title}</h3>
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{article.time}</span>
                <span className="uppercase tracking-widest font-medium group-hover:text-foreground transition-colors">Read</span>
              </div>
            </Link>
          ))}
        </StaggerChildren>
      </section>

      {/* SECTION 13 — Newsletter */}
      <section className="bg-foreground text-background py-32 px-4 flex justify-center items-center">
        <ScrollReveal className="max-w-xl w-full text-center">
          <h2 className="font-heading text-3xl md:text-5xl mb-6">{tSections('newsletter', { fallback: 'Join the RULLIÉ World' })}</h2>
          <p className="text-background/70 font-light mb-10 max-w-md mx-auto">
            {tNewsletter('subtitle', { fallback: 'Subscribe to receive early access to new collections, exclusive editorial content, and styling insights.' })}
          </p>
          
          <form className="flex flex-col sm:flex-row gap-0 w-full mb-10" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder={tNewsletter('placeholder', { fallback: 'Email Address' })}
              className="flex-1 bg-transparent border border-background/30 focus:border-background py-4 px-6 outline-none text-sm transition-colors rounded-none placeholder:text-background/50"
            />
            <button type="submit" className="bg-background text-foreground px-8 py-4 text-sm tracking-widest uppercase hover:bg-background/90 transition-colors">
              {tNewsletter('subscribe', { fallback: 'Subscribe' })}
            </button>
          </form>

          <div className="flex flex-wrap justify-center gap-4 text-xs tracking-widest uppercase text-background/50 mb-12">
            <span>• Early Access</span>
            <span>• Exclusive Content</span>
            <span>• Styling Insights</span>
          </div>

          <p className="text-[10px] text-background/40 max-w-sm mx-auto">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </ScrollReveal>
      </section>
    </main>
  );
}
