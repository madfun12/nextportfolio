"use client";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Button from "./Button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

type Route = {
    name: string;
    href: string;
};
const MobileMenu = ({ routes }: { routes: Route[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div
                className="md:hidden p-4 cursor-pointer relative z-10"
                role="button"
            >
                <Button onClick={toggleMenu}>
                    <FiMenu
                        className="text-neutral-800 dark:text-white"
                        size="32"
                    />
                </Button>
            </div>
            <div
                className={`md:hidden fixed w-72 top-0 bg-[#e5e5e5d1] dark:bg-[#121212d1] h-screen backdrop-blur-md transition-[250ms] ${
                    isOpen ? "right-0" : "-right-72"
                }`}
            >
                <Button
                    onClick={() =>
                        theme === "dark" ? setTheme("light") : setTheme("dark")
                    }
                    className="m-5"
                >
                    <Sun size={22} className="hidden dark:block" />
                    <Moon size={22} className="block dark:hidden" />
                </Button>
                <ul className="h-fit mt-20 flex flex-col items-end p-4">
                    {routes.map((link) => (
                        <li key={link.href} className="h-fit my-4">
                            <a
                                href={link.href}
                                className="p-2 dark:text-neutral-200 hover:text-blue-500 transition text-xl py-4"
                            >
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default MobileMenu;
