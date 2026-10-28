import { img } from './images.js';

// Editable collection names and copy. These are editorial groupings, not statements about stock.
export const collections = [
  {
    slug: 'festive-edit',
    name: 'The Festive Edit',
    description: 'Colour and ceremony, draped with ease.',
    intro: 'Sarees for the days that ask to be remembered.',
    image: img('collection-festive.svg'),
    imageAlt: 'Placeholder image for The Festive Edit: terracotta pleats with a gold border.',
  },
  {
    slug: 'soft-petals',
    name: 'Soft Petals',
    description: 'Light fabrics in the palest blooms.',
    intro: 'Airy drapes and quiet colour, inspired by the lily at first light.',
    image: img('collection-petals.svg'),
    imageAlt: 'Placeholder image for Soft Petals: pale pink pleats.',
  },
  {
    slug: 'modern-classics',
    name: 'Modern Classics',
    description: 'Understated sarees for every day.',
    intro: 'Clean lines and calm colour for the saree you reach for again and again.',
    image: img('collection-classics.svg'),
    imageAlt: 'Placeholder image for Modern Classics: sage green pleats.',
  },
  {
    slug: 'evening-elegance',
    name: 'Evening Elegance',
    description: 'After dark, in deep and luminous tones.',
    intro: 'Drapes made for candlelight, music and long conversations.',
    image: img('collection-evening.svg'),
    imageAlt: 'Placeholder image for Evening Elegance: midnight blue pleats.',
  },
];

export const getCollection = (slug) => collections.find((c) => c.slug === slug);
