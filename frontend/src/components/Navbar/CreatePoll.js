import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';

const CreatePoll = ({ show, handleClose }) => {
  const [question, setQuestion] = useState('');
  const [pollType, setPollType] = useState('single'); // 'single' or 'multiple'
  const [options, setOptions] = useState(['']);
  const [error, setError] = useState('');

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSaveChanges = () => {
    if (!question.trim()) {
      setError('Please enter a poll question.');
      return;
    }

    // Add your additional validation logic here if needed

    // Add your logic to handle saving the poll
    console.log('Poll Question:', question);
    console.log('Poll Type:', pollType);
    console.log('Poll Options:', options);

    // Reset state and close modal
    setQuestion('');
    setPollType('single');
    setOptions(['']);
    setError('');
    handleClose();
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
            <Form.Label className="custom-form-label">Poll Type:</Form.Label>
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
            <Form.Label className="custom-form-label">Poll Options:</Form.Label>
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
            <Button variant="light" onClick={handleAddOption} className="custom-add-option-btn">
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
