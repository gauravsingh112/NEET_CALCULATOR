import React, { useState } from 'react';


function TotalQuestions({ onClear }) {
  const [totalQuestions, setTotalQuestions] = useState('');
  const [correctAnswers, setCorrectAnswers] = useState('');
  const [wrongAnswers, setWrongAnswers] = useState('');
  const [totalMarks, setTotalMarks] = useState('');

  const handleTotalQuestionsChange = (e) => {
    setTotalQuestions(e.target.value);
  };

  const handleCorrectAnswersChange = (e) => {
    setCorrectAnswers(e.target.value);
  };

  const handleSubmit = () => {
    const total = parseInt(totalQuestions, 10);
    const correct = parseInt(correctAnswers, 10);

    if (isNaN(total) || isNaN(correct)) {
      alert('Please enter valid numbers.');
      return;
    }

    if (total > 180) {
      alert('The total number of attempted questions cannot exceed 180.');
      return;
    }

    const wrong = total - correct;
    const marks = (correct * 4) - (wrong * 1);

    setWrongAnswers(wrong);
    setTotalMarks(marks);
  };

  const handleClear = () => {
    setTotalQuestions('');
    setCorrectAnswers('');
    setWrongAnswers('');
    setTotalMarks('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className="total-questions">
      <label htmlFor="totalQuestions">Enter the total number of questions you attempted:</label>
      <input
        id="totalQuestions"
        type="number"
        value={totalQuestions}
        onChange={handleTotalQuestionsChange}
      />

      <label htmlFor="correctAnswers">Enter the number of correct answers:</label>
      <input
        id="correctAnswers"
        type="number"
        value={correctAnswers}
        onChange={handleCorrectAnswersChange}
      />

      <button className="submit-button" onClick={handleSubmit}>Submit</button>
      <button className="clear-button" onClick={handleClear}>Clear</button>

      {totalMarks !== '' && (
        <div className="results">
          <p className="description">
            Results based on the entered data:
          </p>
          <p>Total Questions Attempted: {parseInt(totalQuestions, 10)}</p>
          <p>Correct Answers: {correctAnswers}</p>
          <p>Wrong Answers: {wrongAnswers}</p>
          <p>Total Marks: {totalMarks}</p>
        </div>
      )}
    </div>
  );
}

export default TotalQuestions;
