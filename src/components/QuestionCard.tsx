import React from "react";

type QuestionCardProps = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: any;
    questionNr: number;
    totalQuestions: number
}

export const QuestionCard = ({ question, answers, callback, userAnswer, questionNr, totalQuestions }: QuestionCardProps) => {
    return (
        <div>
            <p className="number">Question: {questionNr} / {totalQuestions}</p>
            <p dangerouslySetInnerHTML={{ __html: question }}></p>
            <div>
                {answers.map((answer) => (
                    <div key={answer}>
                        <button disabled={userAnswer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
};