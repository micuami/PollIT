import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const Register = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSaveChanges = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const result = await response.json();
        if (response.status === 400 && result.error === "User already exists with this email.") {
          setError('User already exists');
        } else {
          throw new Error('Registration failed');
        }
      } else {
        const result = await response.json();
        console.warn(result);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        handleClose();
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };
  

  return (
    <Modal 
          size="sm"
          show={show} 
          onHide={handleClose}>
        <Modal.Header className="custom-form-header">
            <CloseButton onClick={handleClose} className="custom-close-btn" />
        </Modal.Header>
        <Modal.Body className="custom-form-body">
        <Modal.Title className="custom-modal-title">Register</Modal.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="custom-form-control"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="custom-form-control"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="custom-form-control"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button variant="light" onClick={handleSaveChanges} className="custom-modal-btn">
            Create account
          </Button>
          {error && <p className="text-danger">{error}</p>}
        </Modal.Footer>
    </Modal>
  );
};

export default Register;
