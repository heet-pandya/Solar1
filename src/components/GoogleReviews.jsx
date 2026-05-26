import React, { useState } from 'react';

// ★ Static Google-style reviews – no API key required.
// To update reviews, simply edit the `reviews` array below.
// To link the "Write a Review" button, replace GOOGLE_PLACE_ID with your real Place ID.
// Find your Place ID: https://developers.google.com/maps/documentation/places/web-service/place-id

const GOOGLE_PLACE_ID = 'YOUR_GOOGLE_PLACE_ID'; // Replace with real Place ID
const REVIEW_LINK = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

const reviews = [
  {
    name: 'Rajesh Sharma',
    initials: 'RS',
    rating: 5,
    date: '2 weeks ago',
    text: 'Falcon Energy did a fantastic job installing our 5kW rooftop solar system. The team was professional, completed the work on time, and the after-sales support has been excellent. Our electricity bill has dropped by nearly 80%!',
    color: '#4285F4',
  },
  {
    name: 'Priya Verma',
    initials: 'PV',
    rating: 5,
    date: '1 month ago',
    text: 'Highly recommend Falcon Energy! They handled all the paperwork for PM Kusum Yojana subsidy and got our solar pump installed within three weeks. Very transparent pricing and no hidden costs.',
    color: '#EA4335',
  },
  {
    name: 'Anil Tiwari',
    initials: 'AT',
    rating: 4,
    date: '1 month ago',
    text: 'Good experience overall. The installation crew was skilled and respectful of our property. The monitoring app is a great touch — I can see real-time generation data on my phone. Would have liked a slightly faster permit process.',
    color: '#34A853',
  },
  {
    name: 'Sunita Pandey',
    initials: 'SP',
    rating: 5,
    date: '2 months ago',
    text: 'We switched to solar with Falcon Energy for our factory and the ROI has been incredible. The 25-year warranty gives us total peace of mind. Best investment we have made for our business.',
    color: '#FBBC05',
  },
  {
    name: 'Vikram Joshi',
    initials: 'VJ',
    rating: 5,
    date: '3 months ago',
    text: 'Exceptional service from start to finish. The site survey was thorough, the custom design perfectly matched our roof, and the installation was done in just one day. Saving thousands every month now!',
    color: '#4285F4',
  },
];

const StarRating = ({ rating }) => (
  <div className="gr-stars" aria-label={`${rating} out of 5 stars`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <svg
        key={star}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={star <= rating ? '#FBBC05' : '#dadce0'}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const GoogleLogo = () => (
  <svg width="74" height="24" viewBox="0 0 74 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z" fill="#4285F4"/>
    <path d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#EA4335"/>
    <path d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.52 3.1-3.52 1.74 0 3.1 1.5 3.1 3.54 0 2.02-1.37 3.5-3.1 3.5z" fill="#4285F4"/>
    <path d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z" fill="#FBBC05"/>
    <path d="M58 .24h2.51v17.57H58z" fill="#34A853"/>
    <path d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z" fill="#EA4335"/>
  </svg>
);

export default function GoogleReviews() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, 3);

  // Compute aggregate
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section className="section google-reviews-section" id="google-reviews">
      <div className="container">
        {/* Header */}
        <div className="gr-header">
          <GoogleLogo />
          <h2>Customer Reviews</h2>
          <div className="gr-aggregate">
            <span className="gr-avg">{avg}</span>
            <StarRating rating={Math.round(Number(avg))} />
            <span className="gr-count">Based on {reviews.length} reviews</span>
          </div>
        </div>

        {/* Review cards */}
        <div className="gr-grid">
          {displayed.map((r, i) => (
            <div className="gr-card" key={i}>
              <div className="gr-card-top">
                <div className="gr-avatar" style={{ background: r.color }}>{r.initials}</div>
                <div className="gr-meta">
                  <h4>{r.name}</h4>
                  <span className="gr-date">{r.date}</span>
                </div>
                {/* Small Google "G" icon */}
                <svg className="gr-g-icon" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <StarRating rating={r.rating} />
              <p className="gr-text">{r.text}</p>
            </div>
          ))}
        </div>

        {/* Show more / less */}
        {reviews.length > 3 && (
          <button className="gr-toggle" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
          </button>
        )}

        {/* Write a review CTA */}
        <a
          href={REVIEW_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="gr-write-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          Write a Review on Google
        </a>
      </div>
    </section>
  );
}
