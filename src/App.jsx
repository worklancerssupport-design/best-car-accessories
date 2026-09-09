import CustomCursor from './components/ui/CustomCursor/CustomCursor';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import ScrollToTop from './components/layout/ScrollToTop/ScrollToTop';
import WhatsAppButton from './components/ui/WhatsAppButton/WhatsAppButton';
import ErrorBoundary from './components/ui/ErrorBoundary/ErrorBoundary';
import './App.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ExteriorCategoryPage = lazy(() => import('./pages/ExteriorCategoryPage'));
const InteriorCategoryPage = lazy(() => import('./pages/InteriorCategoryPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FranchisePage = lazy(() => import('./pages/FranchisePage'));
const ReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function LoadingSpinner() {
  return (
    <div className="app-loading" role="status" aria-label="Loading page">
      <div className="app-loading__spinner" />
      <span className="app-loading__text">Loading Studio Data...</span>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <CustomCursor />
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/exterior-car-accessories-chennai" element={<ExteriorCategoryPage />} />
            <Route path="/exterior-car-accessories-chennai/:slug" element={<ServiceDetailPage />} />
            <Route path="/interior-car-accessories-chennai" element={<InteriorCategoryPage />} />
            <Route path="/interior-car-accessories-chennai/:slug" element={<ServiceDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/franchise" element={<FranchisePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </ErrorBoundary>
  );
}

export default App;
