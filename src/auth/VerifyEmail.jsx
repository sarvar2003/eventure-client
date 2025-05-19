import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

const VerifyEmail = () => {
  const [status, setStatus] = useState('verifying'); // verifying | success | error
  const navigate = useNavigate();
  const token = useParams()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axiosInstance.get(`users/verify_email/${token.token}/`, {
        });
        if (response.status === 200) {
          setStatus('success');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };

    if (token) {
      verifyEmail();
    } else {
      setStatus('error');
    }
  }, [token]);

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="main-container flex-column justify-content-center align-items-center">
      <nav className="mb-4">
        <a href="/" className="text-decoration-none">
          <h1 className="logo-text">Eventure</h1>
        </a>
      </nav>
      <div className="text-center">
        {status === 'verifying' && <p>Verifying your email...</p>}
        {status === 'success' && (
          <>
            <h2 className="text-primary fw-bold mb-3">Congratulations!</h2>
            <p className="text-muted">You have successfully verified your email.</p>
            <button onClick={handleLoginRedirect} className="btn btn-primary ms-3">
              Login
            </button>
          </>
        )}
        {status === 'error' && (
          <>
            <h2 className="text-danger fw-bold mb-3">Verification Failed</h2>
            <p className="text-muted">The verification link is invalid or has expired.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
