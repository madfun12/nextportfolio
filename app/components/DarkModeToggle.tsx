"use client";
import { useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useState(false);

    const toggleMode = () => {
        setIsDark((prevState) => !prevState);
        const html = document.querySelector("html");
        if (html?.classList.contains("dark")) {
            html.classList.remove("dark");
        } else {
            html?.classList.add("dark");
        }
    };
    return (
        <section className="flex py-8">
            <button
                className="button-dark mx-auto text-neutral-700 dark:text-neutral-200"
                onClick={toggleMode}
            >
                {!isDark ? <MdDarkMode size={32} /> : <MdLightMode size={32} />}
            </button>
        </section>
    );
};

export default DarkModeToggle;
