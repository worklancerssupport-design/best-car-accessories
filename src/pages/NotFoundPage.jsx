import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './NotFoundPage.css';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Best Car Accessories Chennai</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="nfp-section">
        <div className="container nfp-inner">
          <div className="nfp-road">
            <div className="nfp-road__stripe" />
            <div className="nfp-road__stripe" />
            <div className="nfp-road__stripe" />
          </div>
          <div className="nfp-content">
            <div className="nfp-404">404</div>
            <h1 className="nfp-title">Looks like this road doesn't exist.</h1>
            <p className="nfp-subtitle">
              The page you are looking for may have been moved or the URL may be incorrect.
            </p>
            <div className="nfp-actions">
              <Link to="/" className="btn btn-primary btn-lg">
                <Home size={18} />
                Back to Home
              </Link>
              <Link to="/exterior-car-accessories-chennai" className="btn btn-secondary btn-lg">
                Browse Accessories
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
