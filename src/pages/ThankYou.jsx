import React from 'react';

const ThankYou = () => {
  return (
    <div className="container text-center my-5">
      <h1 className="display-4 text-success mb-4">Thank You!</h1>
      <p className="lead">
        Your message has been successfully sent. We'll get back to you as soon as possible.
      </p>
      <a href="/" className="btn btn-primary mt-4">
        Back to Home
      </a>
    </div>
  );
};

export default ThankYou;
