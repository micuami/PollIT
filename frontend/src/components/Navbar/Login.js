import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Login = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        console.log('Login successful. Token:', token);
        setEmail('');
        setPassword('');
        handleClose();
      } else {
        const { error } = await response.json();
        console.error('Login failed:', error);
        setError(error); // Set the error state with the received error message
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred.'); // Set a default error message for unexpected errors
    }
  };


  return (
    <Modal size="sm" show={show} onHide={handleClose}>
      <Modal.Header className="custom-form-header">
        <CloseButton onClick={handleClose} className="custom-close-btn" />
      </Modal.Header>
      <Modal.Body className="custom-form-body">
        <Modal.Title className="custom-modal-title">Login</Modal.Title>
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
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="custom-form-control"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <Button variant="light" onClick={handleSaveChanges} className="custom-modal-btn">
          Login
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Footer>
    </Modal>
  );
};

export default Login;
