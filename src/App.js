import React, { useState } from 'react';
import './styles.css';
import Border from './components/Border';
import ClaimMarks from './components/ClaimMarks';
import TotalQuestions from './components/TotalQuestions';

function App() {
  const [choice, setChoice] = useState(null);

  const handleChoice = (selectedChoice) => {
    setChoice(selectedChoice);
  };

  const handleBack = () => {
    setChoice(null);
  };

  return (
    <div className="app">
      <Border />
      <h2 className="title">NEET SCORE CALCULATOR</h2>
      <Border />
      {choice === null && (
        <div className="choices">
          <div className="choice" onClick={() => handleChoice(1)}>Enter the claim marks</div>
          <div className="choice" onClick={() => handleChoice(2)}>Enter the total number of questions you attempted</div>
        </div>
      )}
      <Border />
      {choice === 1 && <ClaimMarks />}
      {choice === 2 && <TotalQuestions />}
      {choice && (
        <div className="action-buttons">
          <button className="back-button" onClick={handleBack}>Back</button>
        </div>
      )}
      <div className="footer">
        © TeamGSR
      </div>
    </div>
  );
}

export default App;
