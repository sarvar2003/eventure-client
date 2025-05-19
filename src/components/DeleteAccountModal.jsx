import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axiosInstance from '../utils/axios';
import Cookies from 'js-cookie';

const DeleteAccountModal = ({ show, handleClose, userEmail }) => {
  const [confirmEmail, setConfirmEmail] = useState('');
  const [error, setError] = useState('');

  const handleDelete = () => {
    if (confirmEmail !== userEmail) {
      setError('Email does not match.');
      return;
    }

    Cookies.remove('email');
    Cookies.remove('token');
    Cookies.remove('first_name');
    Cookies.remove('last_name');
    axiosInstance.delete(`/users/me/`)
      .then(() => {
        alert('Account deleted successfully.');
        window.location.href = '/signup';
      })
      .catch(() => {
        setError('Something went wrong. Please try again.');
      });
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Account Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-danger fw-bold">
          This action cannot be undone. To confirm deletion, please enter your email.
        </p>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          onPaste={(e) => e.preventDefault()}
          required
        />
        {error && <div className="text-danger mt-2">{error}</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete Account
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteAccountModal;
