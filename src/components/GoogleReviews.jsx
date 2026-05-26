import React from 'react';

// IMPORTANT: Replace GOOGLE_PLACE_ID and GOOGLE_API_KEY with your actual values.
// This component uses the Google Maps Embed API to show a place preview which includes reviews.
// For a full reviews widget, consider using a third‑party service (e.g., Elfsight) that provides an embed code.

const GoogleReviews = ({ placeId = 'YOUR_GOOGLE_PLACE_ID', apiKey = 'YOUR_GOOGLE_API_KEY' }) => {
  const src = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=place_id:${placeId}&zoom=15`;
  return (
    <section className="google-reviews-section section" id="google-reviews">
      <div className="container">
        <h2 className="section-title">Customer Reviews on Google</h2>
        <div className="google-reviews-embed" style={{ width: '100%', height: '400px', border: '0' }}>
          <iframe
            title="Google Reviews"
            src={src}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '8px' }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', color: 'var(--text-light)' }}>
          * Reviews displayed are fetched directly from Google. Ensure your Google Cloud project has the Maps Embed API enabled.
        </p>
      </div>
    </section>
  );
};

export default GoogleReviews;
