import axios from "./axios";
import { shuffleArray } from "../utils";

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionAnswers = Question & { answers: string[] }

export type Difficulty = "easy" | "medium" | "hard"
/* this can also be enum 
    enum DIFFICULTY { 
        EASY = "easy"
        MEDIUM = "medium"
        HARD = "hard"
    }
    it can be accessed like DIFFICULTY.EASY
*/

export const fetchQuestions = async (amount: number, difficulty: Difficulty) => {
    try {
        const { data } = await axios.get(`api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`)
        return data.results.map((query: Question) => (
            {
                ...query,
                answers: shuffleArray([query.correct_answer, query.incorrect_answers])
            }
        ))
    } catch (error) {
        throw error;
    }
}