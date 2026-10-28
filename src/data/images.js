// Every image URL used by the site is listed here (plus product images in products.js).
// The files in /public/images are generated placeholder artwork. To use real photography,
// either overwrite those files or replace the strings below with your own image URLs.
const base = import.meta.env.BASE_URL;
export const img = (name) => `${base}images/${name}`;

export const IMAGES = {
  storyLarge: {
    src: img('story-large.svg'),
    alt: 'Editorial placeholder: soft pink pleats with a champagne border.',
  },
  storySmall: {
    src: img('story-small.svg'),
    alt: 'Editorial placeholder: a sage green drape in detail.',
  },
  ourStory: {
    src: img('story-detail.svg'),
    alt: 'Editorial placeholder: ivory pleats with a gold lily motif border.',
  },
};
