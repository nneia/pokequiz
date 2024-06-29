export interface QuestionPrompt {
  id: number;
  image: string;
  options: string[];
  correctAnswer: string;
}
export interface Answer {
  questionId: number;
  answer: string;
}
export interface HeaderProps {
  numberOfQuestions: number;
  currentQuestionIndex: number;
}
export interface QuizAreaProps {
  question: QuestionPrompt;
  currentQuestionIndex: number;
  handleAnswer: (answer: string) => void;
  handleNext: () => void;
  handleBack: () => void;
  savedAnswers: Answer[];
  validationMessage: string | null;
}
export interface ResultsAreaProps {
  questions: QuestionPrompt[];
  answers: Answer[];
}
