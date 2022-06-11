import React, { useState } from 'react';
import { fetchQuestions, QuestionAnswers } from "./api/API"
import { QuestionCard } from "./components/QuestionCard";

const TOTAL_QUESTIONS = 10;

export type Answer = {
  question: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: string;
}

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionAnswers[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const displayNextQuestionBtn = userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS;
  const isLastQuestionAnswered = userAnswers.length === TOTAL_QUESTIONS;

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

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.value;
    const isCorrect = questions[number].correct_answer === answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    const answerObject = {
      question: questions[number].question,
      answer,
      isCorrect,
      correctAnswer: questions[number].correct_answer
    }
    setUserAnswers(prev => [...prev, answerObject])
  }

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {loading ?
        <p>Loading Questions...</p> :
        <>
          {(gameOver || isLastQuestionAnswered) &&
            <button className="start" onClick={startTrivia}>Start</button>
          }
          {!gameOver &&
            <>
              <p className="score">Score: {score}</p>
              <QuestionCard
                questionNr={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswer}
              />
              {displayNextQuestionBtn &&
                <button className="next" onClick={nextQuestion}>Next Question</button>
              }
            </>
          }
        </>
      }
    </div>
  );
}

