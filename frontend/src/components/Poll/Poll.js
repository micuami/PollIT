import React, { useState, useEffect } from 'react';
import './Poll.css';

const Poll = () => {
  const [polls, setPolls] = useState([]);

  const fetchPolls = async () => {
    try {
      const response = await fetch('http://localhost:5000/polls');
      if (response.ok) {
        const data = await response.json();
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

  return (
    <div>
      <ul>
        {polls.map((poll) => (
          <li key={poll._id}>
            {poll.question} - Created by: {poll.createdBy}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Poll;
