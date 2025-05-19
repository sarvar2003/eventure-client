import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Privacy Policy</h1>
      <p>
        At <strong>Eventure</strong>, we value your privacy. This Privacy Policy explains how we collect, use, and protect your information.
      </p>

      <h4 className="mt-4">Information We Collect</h4>
      <ul>
        <li>Personal information like name, email, and contact details when you register or make reservations.</li>
        <li>Event preferences and reservation data.</li>
        <li>Technical data such as browser type and IP address.</li>
      </ul>

      <h4 className="mt-4">How We Use Your Information</h4>
      <ul>
        <li>To process event bookings and send confirmations.</li>
        <li>To improve user experience and provide support.</li>
        <li>To send updates or promotional emails (only if you opt in).</li>
      </ul>

      <h4 className="mt-4">Data Protection</h4>
      <p>
        We implement appropriate security measures to protect your data. We do not share your personal data with third parties without your consent.
      </p>

      <h4 className="mt-4">Cookies</h4>
      <p>
        We use cookies to enhance your browsing experience. You can disable cookies in your browser settings.
      </p>

      <h4 className="mt-4">Your Rights</h4>
      <p>
        You have the right to access, update, or delete your personal data. To exercise your rights, contact us via the contact form.
      </p>

      <h4 className="mt-4">Changes to This Policy</h4>
      <p>
        We may update this policy from time to time. Changes will be reflected on this page with the updated date.
      </p>

      <p className="mt-5 text-muted">Last updated: May 7, 2025</p>
    </div>
  );
};

export default PrivacyPolicy;
