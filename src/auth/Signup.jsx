import React, { useState } from 'react';
import axiosInstance from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const initialFormData = {
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    axiosInstance
      .post('users/create/', formData)
      .then(() => {
        setIsRegistered(true);
      })
      .catch((error) => {
        console.log('Signup error:', error);
        if (error.response) {
          if (error.response.data.email) {
            setErrorMessage('This email is already taken.');
          } else if (error.response.data.non_field_errors) {
            setErrorMessage('Passwords do not match.');
          } else {
            setErrorMessage('There was an error. Please try again.');
          }
        } else {
          setErrorMessage('Server error.');
        }
      });
  };

  return (
    <div className="main-container flex-column justify-content-center align-items-center">
        <nav className="mb-4">
            <a href="/" className="text-decoration-none">
            <h1 className="logo-text">Eventure</h1>
            </a>
        </nav>

      {!isRegistered ? (
        <div className="w-100" style={{ maxWidth: '500px' }}>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="form-control"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="form-control"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="form-control"
              onChange={handleChange}
              required
            />
            <div className="">
                <input
                type={showPassword ? 'text' : 'password'}
                className="form-control form-control mb-3"
                placeholder="Password"
                name="password"
                autoComplete="on"
                onChange={handleChange}
                required
                />
                <input
                type={showPassword ? 'text' : 'password'}
                name="confirm_password"
                placeholder="Confirm Password"
                className="form-control"
                onChange={handleChange}
                required
                />
                <div className="form-check mt-2 d-flex justify-content-end align-items-center">
                <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() => setShowPassword(!showPassword)}
                />
                <label className="form-check-label ms-2 text-muted small">Show password</label>
                </div>
            </div>
            <button type="submit" className="btn btn-primary ms-3">
              Signup
            </button>
            <p className="text-center text-muted mt-3">
              Already signed up ? {' '}
              <a href="/login" className="text-primary text-decoration-underline">
                Login
              </a>
            </p>
          </form>
        </div>
      ) : (
      <div className="text-center">
        <h2 className="text-primary fw-bold mb-3">Conguratulations!</h2>
        <p className="text-muted">
          You have successfully registered to Eventure. Please check your mail to verify your account.
        </p>
        <a href="/login" className="btn btn-success mt-3">
          Verified
        </a>
      </div>
      )}
    </div>
  );
};

export default Signup;
