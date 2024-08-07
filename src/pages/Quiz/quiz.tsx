import { useState, useEffect } from "react";
import "../../App.css";
import Header from "../../components/Header/Header.tsx";
import QuizArea from "../../components/QuizArea/QuizArea.tsx";
import ResultsArea from "../../components/ResultsArea/ResultsArea.tsx";
import { QuestionPrompt, Answer } from "../../appTypes.ts";

const initialQuestions: QuestionPrompt[] = [
  {
    id: 1,
    image: "src/assets/Pikachu.png",
    options: ["Bulbasaur", "Charmander", "Squirtle", "Pikachu"],
    correctAnswer: "Pikachu",
  },
  {
    id: 2,
    image: "src/assets/Jigglypuff.png",
    options: ["Jigglypuff", "Meowth", "Gengar", "Snorlax"],
    correctAnswer: "Jigglypuff",
  },
  {
    id: 3,
    image: "src/assets/Eevee.png",
    options: ["Eevee", "Vaporeon", "Jolteon", "Flareon"],
    correctAnswer: "Eevee",
  },
  {
    id: 4,
    image: "src/assets/Machop.png",
    options: ["Machop", "Machoke", "Machamp", "Geodude"],
    correctAnswer: "Machop",
  },
  {
    id: 5,
    image: "src/assets/Onix.png",
    options: ["Geodude", "Graveler", "Golem", "Onix"],
    correctAnswer: "Onix",
  },
  {
    id: 6,
    image: "src/assets/Cubone.png",
    options: ["Marowak", "Cubone", "Kangaskhan", "Rhyhorn"],
    correctAnswer: "Cubone",
  },
  {
    id: 7,
    image: "src/assets/Electrode.png",
    options: ["Magnemite", "Magneton", "Electrode", "Voltorb"],
    correctAnswer: "Electrode",
  },
  {
    id: 8,
    image: "src/assets/Bellsprout.png",
    options: ["Oddish", "Gloom", "Vileplume", "Bellsprout"],
    correctAnswer: "Bellsprout",
  },
  {
    id: 9,
    image: "src/assets/Pidgeot.png",
    options: ["Pidgey", "Pidgeotto", "Pidgeot", "Spearow"],
    correctAnswer: "Pidgeot",
  },
  {
    id: 10,
    image: "src/assets/Raticate.png",
    options: ["Rattata", "Raticate", "Zubat", "Golbat"],
    correctAnswer: "Raticate",
  },
];

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  //Load the correct answser for the current session
  useEffect(() => {
    const sessionAnswers = JSON.parse(
      localStorage.getItem("quizAnswers") || "[]"
    ); // [] - fallback default value
    const sessionCurrentQuestionIndex = JSON.parse(
      localStorage.getItem("sessionQuestionIndex") || "0"
    );

    if (sessionAnswers.length > 0) {
      setAnswers(sessionAnswers);
    }
    if (sessionCurrentQuestionIndex) {
      setCurrentQuestionIndex(sessionCurrentQuestionIndex);
    }
  }, []);

  const handleAnswer = (answer: Answer["answer"]) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = {
      questionId: initialQuestions[currentQuestionIndex].id,
      answer,
    };
    setAnswers(newAnswers);
    localStorage.setItem("quizAnswers", JSON.stringify(newAnswers));
  };

  const handleNext = () => {
    if (
      !answers[currentQuestionIndex] ||
      !answers[currentQuestionIndex].answer
    ) {
      setValidationMessage("Please answer before proceeding.");
      return;
    }
    //Resetting validation message
    setValidationMessage(null);

    if (currentQuestionIndex < initialQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      localStorage.setItem(
        "sessionQuestionIndex",
        JSON.stringify(currentQuestionIndex + 1)
      );
    } else {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    //Resetting validation message
    setValidationMessage(null);

    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <>
      <Header
        numberOfQuestions={initialQuestions.length}
        currentQuestionIndex={currentQuestionIndex}
      />
      {!showResults ? (
        <QuizArea
          question={initialQuestions[currentQuestionIndex]}
          currentQuestionIndex={currentQuestionIndex}
          handleAnswer={handleAnswer}
          handleNext={handleNext}
          handleBack={handleBack}
          savedAnswers={answers}
          validationMessage={validationMessage}
        />
      ) : (
        <ResultsArea questions={initialQuestions} answers={answers} />
      )}
    </>
  );
}

export default Quiz;
