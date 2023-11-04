import MobileMenu from "./mobileMenu";

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
    return (
        <div className="flex items-center justify-between sticky top-0 w-full bg-light-bg dark:bg-dark-bg border-b border-b-neutral-800 z-10">
            <a
                className="text-5xl font-bold p-4 tracking-tighter dark:text-neutral-200"
                href="/"
            >
                madfun
            </a>
            <ul className="hidden md:flex">
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
            </ul>
            <MobileMenu routes={routes} />
        </div>
    );
};

export default Navbar;
