import React from "react";
import "./Header.css";
import { HeaderProps } from "../../appTypes.ts";

const Header: React.FC<HeaderProps> = ({
  numberOfQuestions,
  currentQuestionIndex,
}) => {
  return (
    <div className="header-container">
      <h1 className="page-title">POKEQUIZ - guess the Pokemon name</h1>
      <div className="question-nav">
        {Array.from({ length: numberOfQuestions }).map((_, index) => (
          <div
            key={index}
            className={`question-nav-elem ${
              index === currentQuestionIndex ? "current" : ""
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Header;
