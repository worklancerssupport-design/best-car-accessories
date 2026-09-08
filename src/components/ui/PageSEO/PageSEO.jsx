import React from 'react';
import { Helmet } from 'react-helmet-async';
import { business } from '../../../config/business';

export default function PageSEO({ title, description, canonical, ogImage, schema }) {
  const fullTitle = `${title} | Best Car Accessories Chennai`;
  const defaultDesc = "Premium car accessories and professional customization in Chennai. Specializing in exterior and interior upgrades, LED lights, seat covers, and more.";
  
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:type" content="website" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:site_name" content={business.name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
