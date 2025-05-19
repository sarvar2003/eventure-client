import React from 'react';

const TermsOfService = () => {
  return (
    <div className="container my-5">
      <h1 className="mb-4">Terms of Service</h1>
      <p>
        Welcome to <strong>Eventure</strong>. By using our platform, you agree to the following terms and conditions. Please read them carefully.
      </p>

      <h4 className="mt-4">1. Acceptance of Terms</h4>
      <p>
        By accessing or using our website, you agree to be bound by these Terms of Service and our Privacy Policy.
      </p>

      <h4 className="mt-4">2. User Accounts</h4>
      <ul>
        <li>Users must provide accurate and complete information when creating an account.</li>
        <li>Each user is responsible for maintaining the confidentiality of their login credentials.</li>
      </ul>

      <h4 className="mt-4">3. Event Bookings</h4>
      <ul>
        <li>Bookings are subject to availability and must be made through the platform.</li>
        <li>Eventure is not responsible for cancellations or changes made by event organizers.</li>
      </ul>

      <h4 className="mt-4">4. Prohibited Conduct</h4>
      <ul>
        <li>Misusing the platform or engaging in fraudulent activities is strictly prohibited.</li>
        <li>Users must not post or share offensive or harmful content.</li>
      </ul>

      <h4 className="mt-4">5. Intellectual Property</h4>
      <p>
        All content on Eventure, including logos, designs, and text, is protected by copyright and intellectual property laws. You may not reuse content without permission.
      </p>

      <h4 className="mt-4">6. Limitation of Liability</h4>
      <p>
        Eventure is not liable for any direct or indirect damages arising from the use of the platform or attendance at any event.
      </p>

      <h4 className="mt-4">7. Modifications</h4>
      <p>
        We may modify these terms at any time. Continued use of the platform after changes constitutes your acceptance of the new terms.
      </p>

      <p className="mt-5 text-muted">Last updated: May 7, 2025</p>
    </div>
  );
};

export default TermsOfService;
