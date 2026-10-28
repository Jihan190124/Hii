# VEL — Elegance, in full bloom.

A luxury saree boutique front end: React, Vite, Bootstrap 5 grid, custom CSS, React Router, Lucide icons and Framer Motion. No backend, database or paid API is required. The bag and wishlist are saved in `localStorage`.

> Everything in the catalogue is **sample data**. Images are generated placeholder artwork, the testimonials are labelled samples, and checkout is a demonstration page. Nothing here takes payment, places an order or sends an email.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in /dist
npm run preview    # serve the production build
```

Requires Node 18 or newer.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project to its `main` branch.
2. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow from the **Actions** tab). `.github/workflows/deploy.yml` installs, builds and publishes `dist/`.
4. Your site appears at `https://<your-username>.github.io/<repository-name>/`.

Why it works on any address: `vite.config.js` uses `base: './'` (relative asset paths) and the app uses `HashRouter`, so page refreshes and deep links (`/#/product/lily-whisper-organza`) never need server rewrites. No custom domain is assumed. To add one later, set it under **Settings → Pages**; no code changes are needed.

Tip: after your first `npm install`, commit the generated `package-lock.json`; the workflow then uses `npm ci` for repeatable builds.

## Things to replace

| What | Where |
| --- | --- |
| Brand text, announcement bar, contact placeholders, social links, **WhatsApp number**, care and delivery notes | `src/config/site.js` |
| Hero, editorial and story images | `src/data/images.js` (or overwrite the files in `public/images/`) |
| Products: names, prices, fabrics, colours, occasions, images, saree length and blouse-piece details | `src/data/products.js` |
| Collections | `src/data/collections.js` |
| Testimonials (set to `[]` to hide the section) | `src/data/testimonials.js` |
| Swatch colours for filters | `src/data/colours.js` |
| Privacy Policy and Terms text | `src/pages/Legal.jsx` |

**WhatsApp:** leave `whatsappNumber` empty and the buttons stay visibly disabled. Enter digits only with the country code (for example `91XXXXXXXXXX`) and they become live links containing the product name and URL.

**Product images:** each product uses `public/images/<id>-a.svg` and `<id>-b.svg` (main and detail view). Replace the files, or change the URLs in `products.js`. Keep a 3:4 portrait ratio for best results. Run `npm run placeholders` to regenerate the placeholder artwork.

**Real checkout:** `src/services/checkout.js` is the integration point. It lists what a live checkout still needs (payment provider, shipping, tax, order backend).

## Structure

```
src/
  components/   AnnouncementBar, Navbar, MobileNavigation, SearchOverlay, HeroSection,
                CollectionGrid, ProductCard, ProductGrid, ProductFilters, ProductGallery,
                AddToBagButton, WishlistButton, ShoppingBagDrawer, NewsletterSection,
                EditorialStorySection, TestimonialsSection, Footer, ToastNotifications, ...
  pages/        Home, Shop (all / new / bestsellers), Collections, Collection, ProductDetails,
                Wishlist, ShoppingBag, Checkout (demo), OurStory, Contact, Legal, NotFound
  data/         products.js, collections.js, images.js, colours.js, testimonials.js
  context/      CartContext, WishlistContext, ToastContext
  hooks/        useDialog, useCatalogueControls, useScrolled, useMediaQuery, usePageTitle
  utils/        catalogue (filter/sort/search), format (INR), storage, whatsapp
  config/       site.js, nav.js
  styles/       global.css, components.css
```

## Responsive checks

Product grids use Bootstrap `col-6 col-md-4 col-lg-3`. Check these widths in browser dev tools: 360, 390, 768, 1024 and 1440 px. Filters open as a bottom sheet on phones and tablets and a side drawer on large screens. Animations respect `prefers-reduced-motion`.
