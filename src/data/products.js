import { img } from './images.js';

// DEMONSTRATION INVENTORY. Every product, price and description below is sample data
// to be replaced with real VEL products. Prices are in INR (whole rupees).
// `bestseller` is a sample merchandising label, not sales data.
// Details left as null are shown as "to be confirmed" placeholders on the product page.
const make = (p) => ({
  details: { sareeLength: null, blousePiece: null },
  featuredHome: false,
  bestseller: false,
  isNew: false,
  badge: null,
  ...p,
  images: [img(`${p.id}-a.svg`), img(`${p.id}-b.svg`)],
});

export const products = [
  make({
    id: 'vel-001', slug: 'lily-whisper-organza', name: 'Lily Whisper Organza', price: 12900,
    colour: 'Ivory', fabric: 'Organza', occasion: 'Festive', collection: 'soft-petals',
    isNew: true, badge: 'New Arrival', featuredHome: true, createdAt: '2026-10-20',
    description: 'A sheer, light drape in ivory with a softly gilded edge. Made to move with you.',
  }),
  make({
    id: 'vel-002', slug: 'champagne-bloom-chanderi', name: 'Champagne Bloom Chanderi', price: 14900,
    colour: 'Champagne', fabric: 'Chanderi', occasion: 'Wedding Guest', collection: 'festive-edit',
    bestseller: true, badge: 'Bestseller', featuredHome: true, createdAt: '2026-09-02',
    description: 'A luminous champagne saree with a delicate border, composed for celebrations.',
  }),
  make({
    id: 'vel-003', slug: 'moonpetal-georgette', name: 'Moonpetal Georgette', price: 9800,
    colour: 'Petal Pink', fabric: 'Georgette', occasion: 'Evening', collection: 'evening-elegance',
    createdAt: '2026-08-11',
    description: 'Fluid georgette in a muted petal pink that settles into soft, easy pleats.',
  }),
  make({
    id: 'vel-004', slug: 'verdant-linen-classic', name: 'Verdant Linen Classic', price: 7600,
    colour: 'Botanical Green', fabric: 'Linen', occasion: 'Everyday', collection: 'modern-classics',
    bestseller: true, badge: 'Bestseller', featuredHome: true, createdAt: '2026-07-21',
    description: 'Deep botanical green in a textured linen, kept clean and unembellished.',
  }),
  make({
    id: 'vel-005', slug: 'dawn-blush-organza', name: 'Dawn Blush Organza', price: 11800,
    colour: 'Blush', fabric: 'Organza', occasion: 'Festive', collection: 'soft-petals',
    isNew: true, badge: 'New Arrival', featuredHome: true, createdAt: '2026-10-14',
    description: 'A blush organza that catches the light, finished with a narrow gold edge.',
  }),
  make({
    id: 'vel-006', slug: 'gilded-stem-silk-blend', name: 'Gilded Stem Silk Blend', price: 18500,
    colour: 'Botanical Green', fabric: 'Silk Blend', occasion: 'Wedding Guest', collection: 'festive-edit',
    createdAt: '2026-06-30',
    description: 'A rich green saree with a gilded border inspired by the line of a lily stem.',
  }),
  make({
    id: 'vel-007', slug: 'sage-garden-cotton-silk', name: 'Sage Garden Cotton Silk', price: 8900,
    colour: 'Sage', fabric: 'Cotton Silk', occasion: 'Everyday', collection: 'modern-classics',
    createdAt: '2026-05-18',
    description: 'A calm sage drape with a gentle sheen, easy to wear from morning onwards.',
  }),
  make({
    id: 'vel-008', slug: 'midnight-lily-georgette', name: 'Midnight Lily Georgette', price: 13400,
    colour: 'Midnight', fabric: 'Georgette', occasion: 'Evening', collection: 'evening-elegance',
    bestseller: true, badge: 'Bestseller', featuredHome: true, createdAt: '2026-09-25',
    description: 'Deep midnight georgette with a quiet gold lily motif along the border.',
  }),
  make({
    id: 'vel-009', slug: 'ivory-veil-organza', name: 'Ivory Veil Organza', price: 15600,
    colour: 'Ivory', fabric: 'Organza', occasion: 'Wedding Guest', collection: 'evening-elegance',
    isNew: true, badge: 'New Arrival', featuredHome: true, createdAt: '2026-10-08',
    description: 'A veil-light ivory saree with a broad border, made for long evenings.',
  }),
  make({
    id: 'vel-010', slug: 'rosette-chanderi', name: 'Rosette Chanderi', price: 12200,
    colour: 'Petal Pink', fabric: 'Chanderi', occasion: 'Festive', collection: 'festive-edit',
    createdAt: '2026-08-29',
    description: 'A petal pink chanderi with a soft sheen and a fine, understated border.',
  }),
  make({
    id: 'vel-011', slug: 'terracotta-heirloom-silk-blend', name: 'Terracotta Heirloom Silk Blend', price: 21900,
    colour: 'Terracotta', fabric: 'Silk Blend', occasion: 'Wedding Guest', collection: 'festive-edit',
    createdAt: '2026-04-10',
    description: 'A warm terracotta saree with a generous gold border, designed to be kept.',
  }),
  make({
    id: 'vel-012', slug: 'pearl-dew-linen', name: 'Pearl Dew Linen', price: 8400,
    colour: 'Champagne', fabric: 'Linen', occasion: 'Work', collection: 'modern-classics',
    bestseller: true, badge: 'Bestseller', createdAt: '2026-03-15',
    description: 'A pale champagne linen, crisp at the pleat and soft through the day.',
  }),
];

const byId = new Map(products.map((p) => [p.id, p]));
const bySlug = new Map(products.map((p) => [p.slug, p]));

export const getProductById = (id) => byId.get(id);
export const getProductBySlug = (slug) => bySlug.get(slug);

export const getRelatedProducts = (product, count = 4) => {
  const others = products.filter((p) => p.id !== product.id);
  const score = (p) => (p.collection === product.collection ? 2 : 0) + (p.occasion === product.occasion ? 1 : 0);
  return others.sort((a, b) => score(b) - score(a)).slice(0, count);
};
