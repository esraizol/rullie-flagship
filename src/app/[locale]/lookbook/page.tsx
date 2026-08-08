import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { StaggerChildren } from '@/components/ui';

export const metadata: Metadata = { title: 'Lookbook' };

const LOOKS = Array.from({ length: 9 }, (_, i) => i + 1);

export default async function LookbookPage() {
  const t = await getTranslations('lookbook');
  const tHome = await getTranslations('home');

  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-display font-bold tracking-tight mb-4">{t('title')}</h1>
        <p className="text-muted text-lg font-light mb-16 max-w-xl">{t('subtitle')}</p>

        <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {LOOKS.map((look) => (
            <div key={look} className="relative group">
              <div className="aspect-[3/4] w-full bg-gradient-to-tr from-stone-200 to-stone-400 rounded-sm overflow-hidden">
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute bottom-4 left-4 text-white mix-blend-difference">
                <p className="text-xs tracking-widest uppercase font-medium">{tHome('lookbookLook', { number: look })}</p>
              </div>
            </div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
