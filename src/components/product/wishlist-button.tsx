'use client';

import { useTranslations } from 'next-intl';
import { useWishlistStore } from '@/stores/wishlist-store';

interface WishlistButtonProps {
  productId: string;
}

export function WishlistButton({ productId }: WishlistButtonProps) {
  const t = useTranslations('product');
  const isInWishlist = useWishlistStore((state) => state.isInWishlist(productId));
  const toggleItem = useWishlistStore((state) => state.toggleItem);

  return (
    <button
      type="button"
      onClick={() => toggleItem(productId)}
      className="inline-block border border-foreground text-foreground px-8 py-4 text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-all duration-500"
    >
      {isInWishlist ? t('removeFromWishlist') : t('addToWishlist')}
    </button>
  );
}
