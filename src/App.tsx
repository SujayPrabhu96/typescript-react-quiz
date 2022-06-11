import React from 'react';

// components
import { QuestionCard } from "./components/QuestionCard"

export const App = () => {

  const startTrivia = () => { }

  const nextQuestion = () => { }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button className="start" onClick={startTrivia}>Start</button>
      <p className="score">Score: </p>
      <p>Loading Questions...</p>
      <QuestionCard />
      <button className="next" onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

