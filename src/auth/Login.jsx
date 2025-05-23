import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import Cookies from 'js-cookie';
import '../styles/auth.css';

const Login = () => {
  const history = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('isTokenVerified')) {
      history('/dashboard');
    }
  }, []);

  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });

  const [formData, updateFormDate] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState({ message: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    updateFormDate({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage({ message: '' });

    axiosInstance
      .post('users/token/', {
        grant_type: 'password',
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        Cookies.set('token', res.data.token);
        Cookies.set('first_name', res.data.first_name);
        Cookies.set('last_name', res.data.last_name);
        Cookies.set('email', res.data.email);
        history('/');
        window.location.reload();
      })
      .catch((error) => {
        if (error.message) {
          setErrorMessage({ message: 'Email or password is incorrect' });
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
        <div className="w-100" style={{ maxWidth: '500px' }}>
            <h5 className="text-danger mt-2">{errorMessage.message}</h5>
            <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <div className="mb-3">
                <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
                />
            </div>
            <div className="mb-3 position-relative">
                <input
                type={showPassword ? 'text' : 'password'}
                className="form-control form-control"
                placeholder="Password"
                name="password"
                autoComplete="on"
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
            <button type="submit" className="btn btn-primary ms-3">Login</button>
            </form>
            <p className="mt-5 text-muted text-center">
                <a href="/forgot-password" className="text-primary-blue text-decoration-underline">Forgot password</a>
            </p>
            <p className="text-muted text-center">
                No account ? <a href="/signup" className="text-primary-blue text-decoration-underline">Signup</a>
            </p>

        </div>
        </div>
  );
};

export default Login;
