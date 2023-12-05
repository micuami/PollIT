import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

const CreatePoll = ({ show, handleClose, userEmail }) => {
  const [question, setQuestion] = useState('');
  const [pollType, setPollType] = useState('single'); 
  const [options, setOptions] = useState(['','','']);
  const [error, setError] = useState('');

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSaveChanges = async () => {
    if (!question.trim()) {
      setError('Please enter a poll question.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/polls', {
        email: 'userEmail', 
        question,
        pollType,
        options,
        votes: [], 
      });
  
      console.log('Poll created successfully:', response.data);
  
      setQuestion('');
      setPollType('single');
      setOptions(['', '', '']);
      setError('');
      handleClose();
    } catch (error) {
      console.error('Error creating poll:', error.message);
      setError('Error creating poll. Please try again.');
    }
  };

  return (
    <Modal size="md" show={show} onHide={handleClose}>
      <Modal.Header className="custom-form-header">
        <CloseButton onClick={handleClose} className="custom-close-btn" />
      </Modal.Header>
      <Modal.Body className="custom-form-body">
        <Modal.Title className="custom-modal-title">Create Poll</Modal.Title>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Poll Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="custom-form-control"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="custom-form-label1">Poll Type:</Form.Label>
            <div className="poll-type-grid">
              <Form.Check
                type="radio"
                label="Single Choice"
                name="pollType"
                id="singleChoice"
                checked={pollType === 'single'}
                onChange={() => setPollType('single')}
                className="custom-form-control-radio"
              />
              <Form.Check
                type="radio"
                label="Multiple Choice"
                name="pollType"
                id="multipleChoice"
                checked={pollType === 'multiple'}
                onChange={() => setPollType('multiple')}
                className="custom-form-control-radio"
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="custom-form-label2">Poll Options:</Form.Label>
            {options.map((option, index) => (
              <Form.Control
                key={index}
                type="text"
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="custom-form-control"
              />
            ))}
            <Button variant="light" onClick={handleAddOption} className="custom-modal-btn">
              + Add Option
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="custom-modal-footer">
        <Button variant="light" onClick={handleSaveChanges} className="custom-modal-btn">
          Create Poll
        </Button>
        {error && <p className="text-danger">{error}</p>}
      </Modal.Footer>
    </Modal>
  );
};

export default CreatePoll;
