"use client";
import useTriviaStore from "@/hooks/useTriviaApi";
import { useState } from "react";
import toast from "react-hot-toast";

const StartScreen = () => {
    const updateUrl = useTriviaStore((state: any) => state.updateUrl);
    const { startGame }: any = useTriviaStore();
    const [gameOptions, setGameOptions] = useState({
        quantity: null,
        multipleChoice: "false",
        trueFalse: "false",
        category: "any",
        difficulty: "",
    });

    const handleChange = (event: any) => {
        try {
            setGameOptions({
                ...gameOptions,

                [event.target.name]: event.target.value,
            });
        } catch (error) {
            toast.error("Issue collecting the form data");
        }
        if (event.target) {
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (gameOptions.quantity === null) {
            toast.error("Quantity is required");
            return;
        } else if (
            gameOptions.multipleChoice === "false" &&
            gameOptions.trueFalse === "false"
        ) {
            toast.error("You must select a question type");
            return;
        } else if (gameOptions.difficulty === "") {
            toast.error("You must select a difficulty");
            return;
        } else {
            const url = `https://opentdb.com/api.php?amount=${
                gameOptions.quantity
            }&difficulty=${gameOptions.difficulty}&${
                gameOptions.category === "any"
                    ? ""
                    : `category=${gameOptions.category}`
            }${
                gameOptions.trueFalse === "true" &&
                gameOptions.multipleChoice === "true"
                    ? ""
                    : `&${
                          gameOptions.trueFalse === "true"
                              ? "type=boolean"
                              : "type=multiple"
                      }`
            }&encode=url3986`;
            updateUrl(url);
            startGame();
        }
    };

    return (
        <div className="">
            <h1 className="text-3xl font-bold tracking-tight">
                Welcome to the trivia game
            </h1>
            <p className="text-neutral-400 mb-4">
                Select your options to start
            </p>
            <p>Number of questions</p>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <ul className="flex py-4 gap-4">
                    <li>
                        <input
                            type="radio"
                            name="quantity"
                            value="5"
                            id="quantity-5"
                            className="opacity-0 peer w-0"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="quantity-5"
                            className="py-2 px-8 border-2 border-neutral-700 rounded-full peer-focus-visible:border-blue-500 peer-focus-visible:outline peer-hover:border-blue-500 transition peer-checked:!border-green-500 cursor-pointer whitespace-nowrap"
                        >
                            5
                        </label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="quantity"
                            value="10"
                            id="quantity-10"
                            className="opacity-0 peer w-0"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="quantity-10"
                            className="py-2 px-8 border-2 border-neutral-700 rounded-full peer-focus-visible:border-blue-500 peer-focus-visible:outline peer-hover:border-blue-500 transition peer-checked:!border-green-500 cursor-pointer whitespace-nowrap"
                        >
                            10
                        </label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="quantity"
                            value={15}
                            id="quantity-15"
                            className="opacity-0 peer w-0"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="quantity-15"
                            className="py-2 px-8 border-2 border-neutral-700 rounded-full peer-focus-visible:border-blue-500 peer-focus-visible:outline peer-hover:border-blue-500 transition peer-checked:!border-green-500 cursor-pointer whitespace-nowrap"
                        >
                            15
                        </label>
                    </li>
                </ul>
                <p>Question Types (select one or both)</p>
                <ul className="flex py-4 gap-4">
                    <li>
                        <input
                            type="checkbox"
                            name="multipleChoice"
                            value={
                                gameOptions.multipleChoice === "false"
                                    ? "true"
                                    : "false"
                            }
                            id="multiple"
                            className="opacity-0 peer w-0"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="multiple"
                            className="py-2 px-8 border-2 border-neutral-700 rounded-full peer-focus-visible:border-blue-500 peer-focus-visible:outline peer-hover:border-blue-500 transition peer-checked:!border-green-500 cursor-pointer whitespace-nowrap"
                        >
                            Multiple choice
                        </label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            name="trueFalse"
                            value={
                                gameOptions.trueFalse === "false"
                                    ? "true"
                                    : "false"
                            }
                            id="truefalse"
                            className="opacity-0 peer w-0"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="truefalse"
                            className="py-2 px-8 border-2 border-neutral-700 rounded-full peer-focus-visible:border-blue-500 peer-focus-visible:outline peer-hover:border-blue-500 transition peer-checked:!border-green-500 cursor-pointer whitespace-nowrap"
                        >
                            True or false
                        </label>
                    </li>
                </ul>
                <p>Difficulty</p>
                <ul className="flex py-4 gap-4">
                    <li>
                        <input
                            type="radio"
                            name="difficulty"
                            value="easy"
                            id="easy"
                            className="opacity-0 peer w-0"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="easy"
                            className="py-2 px-8 border-2 border-neutral-700 rounded-full peer-focus-visible:border-blue-500 peer-focus-visible:outline peer-hover:border-blue-500 transition peer-checked:!border-green-500 cursor-pointer whitespace-nowrap"
                        >
                            Easy
                        </label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="difficulty"
                            value="medium"
                            id="medium"
                            className="opacity-0 peer w-0"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="medium"
                            className="py-2 px-8 border-2 border-neutral-700 rounded-full peer-focus-visible:border-blue-500 peer-focus-visible:outline peer-hover:border-blue-500 transition peer-checked:!border-green-500 cursor-pointer whitespace-nowrap"
                        >
                            Medium
                        </label>
                    </li>
                    <li>
                        <input
                            type="radio"
                            name="difficulty"
                            value="hard"
                            id="hard"
                            className="opacity-0 peer w-0"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="hard"
                            className="py-2 px-8 border-2 border-neutral-700 rounded-full peer-focus-visible:border-blue-500 peer-focus-visible:outline peer-hover:border-blue-500 transition peer-checked:!border-green-500 cursor-pointer whitespace-nowrap"
                        >
                            Hard
                        </label>
                    </li>
                </ul>
                <p className="mb-2">Category</p>
                <select
                    name="category"
                    id="category"
                    className="bg-transparent border border-neutral-700 rounded-lg py-2 px-4 w-fit"
                    defaultValue="any"
                    onChange={handleChange}
                >
                    <option value="any">Any category</option>
                    <option value="9">General Knowledge</option>
                    <option value="11">Film</option>
                    <option value="12">Music</option>
                    <option value="14">Television</option>
                    <option value="19">Mathematics</option>
                    <option value="18">Computers</option>
                    <option value="21">Sports</option>
                </select>
                <button className="bg-green-700 px-8 py-2 w-fit mx-auto rounded-md font-bold text-xl mt-8 hover:bg-neutral-800 border border-green-700 hover:border-neutral-700 transition">
                    Start
                </button>
            </form>
        </div>
    );
};

export default StartScreen;
