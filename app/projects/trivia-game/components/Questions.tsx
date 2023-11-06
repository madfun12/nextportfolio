import { useEffect, useState } from "react";
import { Question } from "./TriviaGameComponent";
import useTriviaStore from "@/hooks/useTriviaApi";

import Confetti from "react-confetti";
import Button from "@/app/components/Button";

const Questions = ({ questions }: { questions: Question[] }) => {
    const triviaStore: any = useTriviaStore();
    const [formattedQuestions, setFormattedQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [confetti, setConfetti] = useState(false);
    const [correct, setCorrect] = useState(0);

    const handleChange = (event: any) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [event.target?.name]: event.target.value,
        });
    };

    const randomizeAnswers = () => {
        let allQuestions: any = [];
        questions.forEach((question) => {
            allQuestions.push({
                question: question.question,
                answers: [
                    ...question.incorrect_answers.map((incorrect) => ({
                        answer: incorrect,
                        correct: false,
                    })),
                    {
                        answer: question.correct_answer,
                        correct: true,
                    },
                ].sort((a, b) => 0.5 - Math.random()),
            });
        });
        return allQuestions;
    };

    const handleSubmit = () => {
        setSubmitted(true);
        const numCorrect = Object.values(selectedAnswers).filter(
            (value: any) => value === "true"
        ).length;

        setCorrect(numCorrect);
        if (numCorrect === questions.length) {
            setConfetti(true);
        }
    };

    useEffect(() => {
        setFormattedQuestions(randomizeAnswers);
    }, [questions]);

    return (
        <div className="flex flex-col">
            {confetti && <Confetti />}
            {formattedQuestions.map((question: any, index: number) => (
                <div key={question.question}>
                    <p className="mb-2 dark:text-neutral-200">
                        {index + 1}. {decodeURIComponent(question.question)}
                    </p>
                    <ul className="mb-4 flex flex-wrap gap-4">
                        {question.answers.map(
                            (answer: any, answerIndex: number) => (
                                <li key={answer.answer} className="h-fit flex">
                                    <input
                                        type="radio"
                                        name={`question-${index + 1}`}
                                        id={`question-${
                                            index + 1
                                        }-${answerIndex}`}
                                        value={answer.correct}
                                        className="opacity-0 peer w-0 h-0"
                                        onChange={handleChange}
                                        disabled={submitted}
                                    />
                                    <label
                                        htmlFor={`question-${
                                            index + 1
                                        }-${answerIndex}`}
                                        className={`py-2 px-8 border-2 border-neutral-400 dark:text-neutral-200 dark:border-neutral-700 rounded-full peer-focus-visible:border-neutral-900 peer-hover:border-neutral-900 dark:peer-focus-visible:border-neutral-500 dark:peer-hover:border-neutral-500 peer-focus-visible:outline  transition peer-checked:bg-dark-bg peer-checked:text-white peer-checked:border-dark-bg dark:peer-checked:bg-white dark:peer-checked:text-black dark:peer-checked:border-white cursor-pointer block whitespace-nowrap peer-disabled:cursor-not-allowed ${
                                            !submitted
                                                ? ""
                                                : answer.correct
                                                ? "peer-checked:!bg-green-700 !border-green-700 dark:peer-checked:!bg-green-500 dark:peer-checked:!border-green-500 peer-[:not(:checked)]:!border-4"
                                                : "peer-checked:!bg-red-700 peer-checked:!border-red-700 dark:peer-checked:!bg-red-500 dark:peer-checked:!border-red-500"
                                        }`}
                                    >
                                        {decodeURIComponent(answer.answer)}
                                    </label>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            ))}
            {!submitted && (
                <button
                    className="px-8 py-2 font-bold mx-auto bg-green-700 rounded-lg disabled:cursor-not-allowed text-white"
                    onClick={handleSubmit}
                    disabled={submitted}
                >
                    Submit
                </button>
            )}
            {submitted && (
                <p className="text-center font-bold text-xl my-4 dark:text-neutral-200">
                    You got
                    {` ${correct}/${questions.length} `}
                    correct
                </p>
            )}
            {submitted && (
                <Button
                    onClick={() => triviaStore.restartGame()}
                    className="px-8 mx-auto"
                >
                    Restart
                </Button>
            )}
        </div>
    );
};

export default Questions;
