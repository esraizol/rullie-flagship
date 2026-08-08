import type { Product } from '@/types/product';
import type { JournalArticle } from '@/types/journal';

/**
 * Temporary in-repo data source, shaped exactly like the real Product /
 * JournalArticle types. This exists so the UI is driven by typed data
 * instead of hardcoded JSX — when a real backend/CMS is introduced, only
 * this module (or its call sites in a data-fetching layer) needs to change,
 * not the components that consume it.
 */

const now = new Date().toISOString();

function placeholderImage(id: string, alt: string): Product['gallery'][number] {
  return { id, src: '', alt, width: 1200, height: 1600 };
}

export const featuredProducts: Product[] = [1, 2, 3, 4].map((n) => ({
  id: `featured-${n}`,
  name: `Silk Scarf N°${n}`,
  slug: `silk-scarf-${n}`,
  category: 'scarves',
  price: 240,
  currency: 'USD',
  description: 'A signature silk scarf from the RULLIÉ core collection.',
  story: '',
  material: '100% Mulberry Silk',
  careInstructions: ['Dry clean only'],
  gallery: [placeholderImage(`featured-${n}-1`, `Silk Scarf N°${n}`)],
  videos: [],
  relatedProducts: [],
  stockStatus: 'in_stock',
  isFeatured: true,
  isNew: false,
  shopierUrl: '',
  seo: { title: `Silk Scarf N°${n} | RULLIÉ`, description: 'A signature silk scarf from the RULLIÉ core collection.' },
  createdAt: now,
  updatedAt: now,
}));

export const crossSellProducts: Product[] = [1, 2, 3].map((n) => ({
  id: `accent-${n}`,
  name: 'Signature Belt',
  slug: `signature-belt-${n}`,
  category: 'belts',
  price: 180,
  currency: 'USD',
  description: 'Noir / Gold',
  story: '',
  material: 'Full-grain leather',
  careInstructions: ['Wipe clean with a soft, dry cloth'],
  gallery: [placeholderImage(`accent-${n}-1`, 'Signature Belt')],
  videos: [],
  relatedProducts: [],
  stockStatus: 'in_stock',
  isFeatured: false,
  isNew: false,
  shopierUrl: '',
  seo: { title: 'Signature Belt | RULLIÉ', description: 'Noir / Gold leather belt.' },
  createdAt: now,
  updatedAt: now,
}));

export const journalPreview: JournalArticle[] = [
  {
    id: 'journal-preview-1',
    title: 'The Making of Nocturne',
    slug: 'the-making-of-nocturne',
    category: 'design',
    tags: ['design'],
    excerpt: '',
    content: '',
    author: { id: 'rullie-editorial', name: 'RULLIÉ Editorial' },
    publishedAt: now,
    readingTime: 5,
    coverImage: '',
    coverImageAlt: 'The Making of Nocturne',
    relatedProducts: [],
    relatedArticles: [],
    isFeatured: true,
    seo: { title: 'The Making of Nocturne | RULLIÉ Journal', description: 'An inside look at the Nocturne collection.' },
  },
  {
    id: 'journal-preview-2',
    title: 'Modern Architecture & Fashion',
    slug: 'modern-architecture-and-fashion',
    category: 'culture',
    tags: ['culture'],
    excerpt: '',
    content: '',
    author: { id: 'rullie-editorial', name: 'RULLIÉ Editorial' },
    publishedAt: now,
    readingTime: 4,
    coverImage: '',
    coverImageAlt: 'Modern Architecture & Fashion',
    relatedProducts: [],
    relatedArticles: [],
    isFeatured: false,
    seo: { title: 'Modern Architecture & Fashion | RULLIÉ Journal', description: 'Modern Architecture & Fashion' },
  },
  {
    id: 'journal-preview-3',
    title: 'Our Promise to the Planet',
    slug: 'our-promise-to-the-planet',
    category: 'sustainability',
    tags: ['sustainability'],
    excerpt: '',
    content: '',
    author: { id: 'rullie-editorial', name: 'RULLIÉ Editorial' },
    publishedAt: now,
    readingTime: 6,
    coverImage: '',
    coverImageAlt: 'Our Promise to the Planet',
    relatedProducts: [],
    relatedArticles: [],
    isFeatured: false,
    seo: { title: 'Our Promise to the Planet | RULLIÉ Journal', description: 'Our approach to sustainability.' },
  },
];
