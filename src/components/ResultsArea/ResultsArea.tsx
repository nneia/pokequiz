import "./ResultsArea.css";

function ResultsArea({ questions, answers }) {
  const score = answers.filter(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    return question.correctAnswer === answer.answer;
  }).length;

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="results-container">
      <div className="score-box">
        <h1 className="results-header">Results</h1>

        <div className="score-visuals">
          {questions.map((question, index) => {
            const answer = answers.find(a => a.questionId === question.id);
            const correct = answer && question.correctAnswer === answer.answer;
            return (
              <div
                key={index}
                className={`score-elem ${correct ? "correct" : "wrong"}`}
              ></div>
            );
          })}
        </div>
        <p className="score-counter">
          Score {score}/{questions.length}
        </p>
      </div>
      <div className="questions-results">
        {answers.map((answer, index) => {
          const question = questions.find(q => q.id === answer.questionId);
          const correct = question.correctAnswer === answer.answer;
          return (
            <div key={index} className="question">
              <p>
                Question {index + 1}:{" "}
                {correct
                  ? "Correct"
                  : `Wrong. The correct answer is ${question.correctAnswer}`}
              </p>
            </div>
          );
        })}
      </div>
      <p className="reload" onClick={refreshPage}>
        Try Again
      </p>
    </div>
  );
}

export default ResultsArea;
