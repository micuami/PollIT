import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './Register.css';

const Register = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveChanges = () => {
    //add logic for handling form data
    console.log('Email:', email);
    console.log('Password:', password);
    handleClose();
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
      </Modal.Footer>
    </Modal>
  );
};

export default Register;
