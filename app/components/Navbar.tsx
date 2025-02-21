"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import MobileMenu from "./mobileMenu";
import Button from "./Button";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const routes = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Projects",
            href: "/projects",
        },
        {
            name: "Blog",
            href: "/blog",
        },
        {
            name: "Contact Me",
            href: "/contact",
        },
    ];

    const pathname = usePathname();

    const { theme, setTheme } = useTheme();
    if (
        pathname === "/projects/openaifaq" ||
        pathname === "/projects/ui-component-builder"
    ) {
        return null;
    }
    return (
        <div className="flex items-center justify-between sticky top-0 w-full bg-light-bg dark:bg-dark-bg border-b border-b-neutral-800 z-10">
            <a
                className="text-5xl font-bold p-4 tracking-tighter dark:text-neutral-200"
                href="/"
            >
                madfun
            </a>
            <ul className="hidden md:flex items-center px-2">
                {routes.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className="p-4 text-neutral-800 dark:text-neutral-400 hover:text-blue-700 dark:hover:text-blue-500 transition"
                        >
                            {link.name}
                        </a>
                    </li>
                ))}
                <li>
                    <Button
                        onClick={() =>
                            theme === "dark"
                                ? setTheme("light")
                                : setTheme("dark")
                        }
                    >
                        <Sun size={22} className="hidden dark:block" />
                        <Moon size={22} className="block dark:hidden" />
                    </Button>
                </li>
            </ul>
            <MobileMenu routes={routes} />
        </div>
    );
};

export default Navbar;
