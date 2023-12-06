import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Poll = () => {
  const [polls, setPolls] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});

  const fetchPolls = async () => {
    try {
      const authToken = 'Bearer ' + localStorage.getItem('authToken');
      const response = await fetch('http://localhost:5000/polls/polls', {
        method: 'GET',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        const data = await response.json();
        const initialSelectedOptions = {};
        data.forEach((poll) => {
          initialSelectedOptions[poll._id] = '';
        });
        setSelectedOptions(initialSelectedOptions);
        setPolls(data);
      } else {
        console.error('Failed to fetch polls');
      }
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  const handleOptionChange = (pollId, optionIndex) => {
    setSelectedOptions({
      ...selectedOptions,
      [pollId]: polls.find((poll) => poll._id === pollId).options[optionIndex],
    });
  };

  const handleVote = async (pollId) => {
    const authToken = 'Bearer ' + localStorage.getItem('authToken');

    try {
      const response = await fetch(`http://localhost:5000/polls/${pollId}/vote`, {
        method: 'POST',
        headers: {
          Authorization: authToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedOption: selectedOptions[pollId] }),
      });

      if (response.ok) {
        fetchPolls();
      } else {
        console.error('Failed to vote on the poll');
      }
    } catch (error) {
      console.error('Error voting on the poll:', error);
    }
  };

  return (
    <div>
        {polls.map((poll) => (
          <div className="wrapper">
              <div className="container">
                  <ul key={poll._id}>
                    <li>{poll.question}</li>
                    {poll.options.map((option, index) => (
                      <Form.Check
                        key={index}
                        type="radio"
                        label={option}
                        name={`optionVote_${poll._id}`}
                        checked={selectedOptions[poll._id] === option}
                        onChange={() => handleOptionChange(poll._id, index)}
                        className="custom-form-control-options"
                      />
                    ))}
                    <Button className="custom-modal-btn-vote" onClick={() => handleVote(poll._id)}>Vote</Button>
                  </ul>
              </div>
          </div>
        ))}
    </div>
  );
};

export default Poll;
