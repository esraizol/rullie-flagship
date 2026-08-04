import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'AI Studio' };

export default function AIStudioPage() {
  const t = useTranslations('aiStudio');
  return (
    <section className="min-h-screen pt-32 pb-20 bg-cream">
      <div className="container mx-auto px-4 md:px-8 text-center">
        <p className="text-sm uppercase tracking-widest text-muted mb-4">{t('comingSoon')}</p>
        <h1 className="font-heading text-display font-bold tracking-tight">{t('title')}</h1>
        <p className="mt-6 text-lg text-muted max-w-xl mx-auto">{t('description')}</p>
      </div>
    </section>
  );
}
