import { lazy, Suspense, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import { ToastProvider } from './context/ToastContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import AnnouncementBar from './components/AnnouncementBar.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ShoppingBagDrawer from './components/ShoppingBagDrawer.jsx';
import SearchOverlay from './components/SearchOverlay.jsx';
import ToastNotifications from './components/ToastNotifications.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';

const Shop = lazy(() => import('./pages/Shop.jsx'));
const Collections = lazy(() => import('./pages/Collections.jsx'));
const Collection = lazy(() => import('./pages/Collection.jsx'));
const ProductDetails = lazy(() => import('./pages/ProductDetails.jsx'));
const Wishlist = lazy(() => import('./pages/Wishlist.jsx'));
const ShoppingBag = lazy(() => import('./pages/ShoppingBag.jsx'));
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const OurStory = lazy(() => import('./pages/OurStory.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <a
              className="vel-skip"
              href="#main"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('main')?.focus();
              }}
            >
              Skip to content
            </a>
            <ScrollToTop />
            <AnnouncementBar />
            <Navbar onSearch={() => setSearchOpen(true)} />
            <main id="main" tabIndex={-1}>
              <Suspense fallback={<div className="vel-loading" aria-busy="true" />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop view="all" />} />
                  <Route path="/shop/new-arrivals" element={<Shop view="new" />} />
                  <Route path="/shop/bestsellers" element={<Shop view="bestsellers" />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/collections/:slug" element={<Collection />} />
                  <Route path="/product/:slug" element={<ProductDetails />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/bag" element={<ShoppingBag />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/our-story" element={<OurStory />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Legal kind="privacy" />} />
                  <Route path="/terms" element={<Legal kind="terms" />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <ShoppingBagDrawer />
            <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
            <ToastNotifications />
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
