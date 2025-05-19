import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import '../styles/auth.css';    


const PasswordReset = () => {
  const { token } = useParams();
  console.log(token);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: '',
    confirm_password: '',
  });

  const [message, setMessage] = useState({ message: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setMessage({ type: 'danger', text: 'Passwords do not match.' });
      console.log(formData);
      return;
    }

    axiosInstance.post(`/users/password_reset/${token}/`, {
        password: formData.password,
        confirm_password: formData.confirm_password,
    })
    .then((res) => {
      setMessage({ type: 'success', text: "Password has been changed!" });
      console.log(res);
      setTimeout(() => navigate('/login'), 2000);
    })
    .catch((err) => {
      setMessage({ type: 'error', text: 'Link has been already used or expired.' });
      console.error(err);
    });
  };


  return (
    <div className="main-container flex-column justify-content-center align-items-center">
        <nav className="mb-4">
            <a href="/" className="text-decoration-none">
            <h1 className="logo-text">Eventure</h1>
            </a>
        </nav>
        <div className="d-flex flex-column align-items-center justify-content-center">
            {message.text && (
            <h5 className={`text-${message.type} text-center mt-2`} style={{ maxWidth: '400px' }}>{message.text}</h5>
            )}
            <form className="w-100 w-md-50 mt-4" onSubmit={handleSubmit}>
                <div className="mb-3 position-relative">
                    <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control form-control"
                    placeholder="Parol"
                    name="password"
                    autoComplete="on"
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className="mb-3">
                    <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm password"
                    autoComplete="on"
                    className="form-control"
                    name="confirm_password"
                    onChange={handleChange}
                    />
                </div>
                <div className="form-check mt-2 mb-3 d-flex justify-content-end align-items-center">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => setShowPassword(!showPassword)}
                    />
                <label className="form-check-label ms-2 text-muted small">Show password</label>
                </div>
                <button type="submit" className="btn btn-primary ms-3">Reset Password</button>
            </form>

        </div>
    </div>
  );
};

export default PasswordReset;
