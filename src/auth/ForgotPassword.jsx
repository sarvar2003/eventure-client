import React, { useState } from 'react';
import axiosInstance from '../utils/axios'; 
import '../styles/auth.css';

const ForgotPassword = () => {
  const initialFormData = Object.freeze({
    email: '',
  });

  const [formData, updateFormDate] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState({ message: '' });
  const [resStatus, setResStatus] = useState('');

  const handleChange = (e) => {
    updateFormDate({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage({ message: '' });

    axiosInstance.post('users/send_password_reset_link/', {
      email: formData.email,
    })
      .then((res) => {
        if (errorMessage.message === '') {
          setResStatus("Password reset link has been sent. Please check your email.");  
          console.log(res);
        }
      })
      .catch((err) => {
        setErrorMessage({ message: "This email has not been registered yet." });
        console.log(err);
      });
  };

  return (
    <div className="main-container flex-column justify-content-center align-items-center">
        <nav className="mb-4">
            <a href="/" className="text-decoration-none">
            <h1 className="logo-text">Eventure</h1>
            </a>
        </nav>

        <div className="container d-flex flex-column align-items-center justify-content-center">
        
            {errorMessage.message && (
            <h5 className="text-danger text-center mt-2" style={{ maxWidth: '400px' }}>{errorMessage.message}</h5>
            )}
            {resStatus && (
            <h5 className="text-success text-center mt-2" style={{ maxWidth: '400px' }}>{resStatus}</h5>
            )}

            <form className="w-100 w-md-50 mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                    required
                    />
                </div>
                <p className="text-muted text-sm text-center mb-4">
                    To get a password reset link, please enter your email address. We will send you a link to reset your password.
                </p>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn-primary-blue w-100 py-3 fs-5 rounded-pill fw-bold">
                        Send
                    </button>
                </div>
            </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
