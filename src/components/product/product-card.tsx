import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { formatPrice } from '@/lib/utils';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations('product');

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <div className="aspect-[3/4] w-full bg-gradient-to-tr from-stone-100 to-stone-300 rounded-sm overflow-hidden mb-4 relative">
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-[10px] tracking-widest uppercase px-2 py-1 rounded-full">
            {t('new')}
          </span>
        )}
      </div>
      <div className="flex flex-col items-center text-center">
        <h3 className="text-xs tracking-widest uppercase font-medium mb-1">{product.name}</h3>
        <span className="text-sm text-muted">{formatPrice(product.price, product.currency, locale)}</span>
      </div>
    </Link>
  );
}
