"use client";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

type Route = {
    name: string;
    href: string;
};
const MobileMenu = ({ routes }: { routes: Route[] }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div
                className="md:hidden p-4 cursor-pointer relative z-10"
                onClick={toggleMenu}
                role="button"
            >
                <FiMenu
                    className="text-neutral-800 dark:text-white"
                    size="32"
                />
            </div>
            <div
                className={`md:hidden fixed w-72 top-0 bg-[#e5e5e5d1] dark:bg-[#121212d1] h-screen backdrop-blur-md transition-[250ms] ${
                    isOpen ? "right-0" : "-right-72"
                }`}
            >
                <ul className="h-fit mt-20 flex flex-col items-end">
                    {routes.map((link) => (
                        <li key={link.href} className="h-fit m-4">
                            <a
                                href={link.href}
                                className="p-4 dark:text-neutral-200 hover:text-blue-500 transition text-xl py-4"
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
