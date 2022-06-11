import React, { useState } from 'react';
import { fetchQuestions, QuestionAnswers } from "./api/API"
import { QuestionCard } from "./components/QuestionCard";

const TOTAL_QUESTIONS = 10;

type Answer = {
  question: string;
  answer: string;
  isCorrect: boolean;
  correct: string;
}

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionAnswers[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    try {
      const newQuestions = await fetchQuestions(TOTAL_QUESTIONS, "easy");
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
    } catch (error) {
      throw error;
    }
  }

  const nextQuestion = () => { }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => { }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {loading ?
        <p>Loading Questions...</p> :
        <>
          <button className="start" onClick={startTrivia}>Start</button>
          <p className="score">Score: </p>
          {/* <QuestionCard
              questionNr={number + 1}
              totalQuestions={TOTAL_QUESTIONS}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            /> */}
          <button className="next" onClick={nextQuestion}>Next Question</button>
        </>
      }
    </div>
  );
}

