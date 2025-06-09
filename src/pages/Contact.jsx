import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
        <Navbar/>
        <div className="container py-5 col-6">
        <h2 className="text-center mb-4">Contact Us</h2>
        <p className="text-center mb-4">Have questions about Eventure? Reach out to us!</p>
        <form
            action="https://formsubmit.co/saravarjuraev@gmail.com"
            method="POST"
            className="mx-auto"
            // style={{ maxWidth: '600px' }}
        >
            
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="box" />
            <input type="hidden" name="_next" value="http://localhost:5173/thank-you" />

            <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" name="name" required className="form-control" placeholder="John Doe" />
            </div>

            <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" required className="form-control" placeholder="john@example.com" />
            </div>

            <div className="mb-3">
            <label className="form-label">Message</label>
            <textarea name="message" required className="form-control" rows="5" placeholder="Your message..."></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-100">Send Message</button>
        </form>
        </div>
        <Footer />
    </div>
  );
};

export default Contact;
