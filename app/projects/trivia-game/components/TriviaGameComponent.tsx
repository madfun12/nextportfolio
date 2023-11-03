/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import useTriviaStore from "@/hooks/useTriviaApi";
import StartScreen from "./StartScreen";
import Questions from "./Questions";

export interface Question {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

const TriviaGameComponent = () => {
    const triviaStore: any = useTriviaStore();
    const [questions, setQuestions] = useState<Question[]>([]);

    const getQuestions = async () => {
        try {
            const response = await axios.get(triviaStore.url);
            const questionsResult = response.data.results;
            setQuestions(questionsResult);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (triviaStore.started) {
            getQuestions();
        }
    }, [triviaStore.started]);

    return (
        <div className="p-4 md:border border-neutral-700 rounded-lg mt-12 mx-auto max-w-2xl">
            {!triviaStore.started && <StartScreen />}
            {triviaStore.started && <Questions questions={questions} />}
        </div>
    );
};

export default TriviaGameComponent;
