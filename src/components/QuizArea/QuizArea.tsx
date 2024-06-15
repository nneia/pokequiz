import React, { useState, useEffect } from "react";
import "./QuizArea.css";
import { QuizAreaProps } from "../../appTypes.ts";

const QuizArea: React.FC<QuizAreaProps> = ({
  question,
  currentQuestionIndex,
  handleAnswer,
  handleNext,
  handleBack,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    // Reset selected answer when the question changes
    setSelectedAnswer(null);
  }, [currentQuestionIndex]);

  const handleSelect = (option: string) => {
    setSelectedAnswer(option);
    handleAnswer(option);
  };

  return (
    <div className="quiz-container">
      <div className="image-box">
        <img src={question.image} alt="Pokemon" className="pokemon-img" />
      </div>
      <div className="quiz-box">
        <h2 className="question-header">Question {currentQuestionIndex + 1}</h2>
        <div className="answers-box">
          {question.options.map((option, index) => (
            <label key={index} className="answer-choice">
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                checked={selectedAnswer === option}
                onChange={() => handleSelect(option)}
              />
              <p>{option}</p>
            </label>
          ))}
        </div>
        <div className="quiz-actions">
          {currentQuestionIndex > 0 && (
            <p className="action-btn" onClick={handleBack}>
              Back
            </p>
          )}
          <p className="action-btn" onClick={handleNext}>
            Next
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizArea;
