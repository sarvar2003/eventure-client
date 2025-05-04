import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-auto">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} Eventure. All Rights Reserved</p>
        <div>
          <a href="/privacy" className="text-muted me-3">Privacy Policy</a>
          <a href="/terms" className="text-muted">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
