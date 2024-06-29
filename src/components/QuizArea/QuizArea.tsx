import React, { useState, useEffect } from "react";
import "./QuizArea.css";
import useAnimatedOuizOptions from "../../hooks/useAnimationQuizOptions.tsx";
import { QuizAreaProps } from "../../appTypes.ts";

const QuizArea: React.FC<QuizAreaProps> = ({
  question,
  currentQuestionIndex,
  handleAnswer,
  handleNext,
  handleBack,
  savedAnswers,
  validationMessage,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const animatedOptions = useAnimatedOuizOptions({
    options: question.options,
  });

  useEffect(() => {
    // Set selected answer to the previously selected answer when the question changes
    setSelectedAnswer(savedAnswers[currentQuestionIndex]?.answer || null);
  }, [currentQuestionIndex, savedAnswers]);

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
            <label
              key={index}
              className={`answer-choice ${
                animatedOptions.includes(option) ? "animate-option" : ""
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestionIndex}`}
                checked={selectedAnswer === option}
                onChange={() => handleSelect(option)}
              />
              <p className="opt-text">{option}</p>
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

        {validationMessage && (
          <div className="validation-message">{validationMessage}</div>
        )}
      </div>
    </div>
  );
};

export default QuizArea;
