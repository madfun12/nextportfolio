"use client";
import { useState } from "react";
import Button from "./components/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";

function App() {
    const [buttonText, setButtonText] = useState("Contact Us");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [style, setStyle] = useState({
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: "7px 20px",
        borderRadius: "6px",
        borderWidth: "2px",
        borderColor: "#cccccc",
    });

    const changeSettings = (
        event: React.FormEvent & { target: HTMLInputElement }
    ) => {
        if (
            event.target.name === "borderRadius" ||
            event.target.name === "borderWidth"
        ) {
            setStyle((prevState) => ({
                ...prevState,
                [event.target.name]: `${event.target.value}px`,
            }));
        } else {
            setStyle((prevState) => ({
                ...prevState,
                [event.target.name]: event.target.value,
            }));
        }
    };

    const handleSubmit = () => {
        try {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setSent(true);
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    };

    const updateText = (
        event: React.FormEvent & { target: HTMLInputElement }
    ) => {
        setButtonText(event.target.value);
    };

    return (
        <main className="flex items-center justify-center h-screen w-full">
            <div className="component-builder border-2 border-neutral-300 rounded-lg w-fit grid grid-cols-2 shadow-lg bg-white">
                <div className="component-wrapper flex items-center justify-center border-r-2 border-neutral-300 p-8">
                    <Button style={style}>{buttonText}</Button>
                </div>
                <div className="component-settings p-8">
                    <label
                        htmlFor="buttonText"
                        className="block text-black pb-1 text-center"
                    >
                        Sample Text
                    </label>
                    <input
                        type="text"
                        onChange={(event) => updateText(event)}
                        value={buttonText}
                        name="buttonText"
                        id="buttonText"
                        className="rounded border border-neutral-300 p-2 m-auto block mb-3 bg-white text-black"
                    />
                    <div className="flex justify-center gap-4 pb-4">
                        <div className="flex  flex-col items-center">
                            <label
                                htmlFor="backgroundColor"
                                className="block text-black pb-1 text-center"
                            >
                                Background color
                            </label>
                            <input
                                type="color"
                                onChange={(event) => changeSettings(event)}
                                value={style.backgroundColor}
                                name="backgroundColor"
                                className="color-picker rounded-lg border-neutral-800 appearance-none box-border cursor-pointer"
                            />
                        </div>
                        <div className="flex  flex-col items-center">
                            <label
                                htmlFor="textColor"
                                className="block text-black pb-1 text-center"
                            >
                                Text color
                            </label>
                            <input
                                type="color"
                                onChange={(event) => changeSettings(event)}
                                value={style.color}
                                name="color"
                                className="color-picker rounded-lg border-neutral-800 appearance-none box-border cursor-pointer"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-black pb-1 text-center">
                            Change border settings
                        </label>
                        <div className="flex gap-2">
                            <div className="p-2 border rounded-md border-neutral-300">
                                <label
                                    htmlFor="borderRadius"
                                    className="block text-black text-center"
                                >
                                    Border color
                                </label>
                                <input
                                    type="color"
                                    value={style.borderColor}
                                    id="borderColor"
                                    name="borderColor"
                                    onChange={(event) => changeSettings(event)}
                                    className="w-full cursor-pointer"
                                />
                            </div>
                            <div className="p-2 border rounded-md border-neutral-300">
                                <label
                                    htmlFor="borderWidth"
                                    className="block text-black text-center"
                                >
                                    Border width
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="4"
                                    value={parseInt(style.borderWidth, 10)}
                                    id="borderWidth"
                                    name="borderWidth"
                                    onChange={(event) => changeSettings(event)}
                                />
                            </div>
                            <div className="p-2 border rounded-md border-neutral-300">
                                <label
                                    htmlFor="borderRadius"
                                    className="block text-black text-center"
                                >
                                    Border radius
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="15"
                                    value={parseInt(style.borderRadius, 10)}
                                    id="borderRadius"
                                    name="borderRadius"
                                    onChange={(event) => changeSettings(event)}
                                />
                            </div>
                        </div>
                        {!sent && (
                            <button
                                onClick={() => handleSubmit()}
                                className="block border rounded-lg my-4 mx-auto px-8 py-2 shadow transition hover:bg-neutral-100 hover:border-neutral-400 text-black"
                            >
                                {loading ? (
                                    <AiOutlineLoading3Quarters
                                        size="28px"
                                        className="animate-spin mx-3"
                                        color="#444"
                                        strokeWidth={2}
                                    />
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        )}
                        {sent && (
                            <button className="block border rounded-lg my-4 mx-auto px-10 py-2 shadow transition hover:cursor-disabled bg-green-600 text-white">
                                <BsCheck size={28} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;
