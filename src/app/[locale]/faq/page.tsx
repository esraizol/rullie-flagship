import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'FAQ' };

export default function FAQPage() {
  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="font-heading text-display font-bold tracking-tight">FAQ</h1>
      </div>
    </section>
  );
}
