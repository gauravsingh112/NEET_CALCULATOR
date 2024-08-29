import React, { useState } from 'react';


function ClaimMarks({ onClear }) {
  const [claimMarks, setClaimMarks] = useState('');
  const [suggestedMarks, setSuggestedMarks] = useState([]);
  const [message, setMessage] = useState('');

  // Function to check if a given total marks is possible
  const isPossibleMark = (totalMarks) => {
    for (let correctAnswers = 0; correctAnswers <= 180; correctAnswers++) {
      const wrongAnswers = 180 - correctAnswers;
      const possibleMarks = (correctAnswers * 4) - (wrongAnswers * 1);
      if (possibleMarks === totalMarks) {
        return true;
      }
    }
    return false;
  };

  // Function to get closest possible marks
  const getClosestPossibleMarks = (totalMarks) => {
    const closestMarks = [];
    for (let i = -10; i <= 10; i++) {
      const possibleMark = totalMarks + i;
      if (isPossibleMark(possibleMark) && !closestMarks.includes(possibleMark)) {
        closestMarks.push(possibleMark);
      }
    }
    closestMarks.sort((a, b) => Math.abs(a - totalMarks) - Math.abs(b - totalMarks));
    return closestMarks.slice(0, 5); // Keep only the closest 5 marks
  };

  const handleInputChange = (e) => {
    setClaimMarks(e.target.value);
  };

  const handleSubmit = () => {
    const marks = parseInt(claimMarks, 10);
    if (isNaN(marks)) {
      alert('Please enter a valid number.');
      return;
    }
    
    if (isPossibleMark(marks)) {
      setMessage('You entered valid claim marks.');
      setSuggestedMarks([]);
    } else {
      setMessage('You entered invalid claim marks. Possible claim marks are:');
      const suggestions = getClosestPossibleMarks(marks);
      setSuggestedMarks(suggestions);
    }
  };

  const handleClear = () => {
    setClaimMarks('');
    setSuggestedMarks([]);
    setMessage('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="claim-marks">
      <label htmlFor="claimMarks">Enter the claim marks:</label>
      <input
        id="claimMarks"
        type="number"
        value={claimMarks}
        onChange={handleInputChange}
      />
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      <button className="clear-button" onClick={handleClear}>Clear</button>

      {message && <p className="message">{message}</p>}

      {suggestedMarks.length > 0 && (
        <div className="results">
          <ul>
            {suggestedMarks.map((mark, index) => (
              <li key={index}>{mark}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ClaimMarks;
