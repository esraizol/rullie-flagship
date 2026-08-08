import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shipping & Returns' };

export default function ShippingPage() {
  const t = useTranslations('footer');
  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-display font-bold tracking-tight">{t('shipping')}</h1>
      </div>
    </section>
  );
}
