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
        <div className="flex items-center justify-between sticky top-0 w-full bg-[#121212] border-b border-b-neutral-800 z-10">
            <a className="text-5xl font-bold p-4" href="/">
                madfun
            </a>
            <ul className="hidden md:flex">
                {routes.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className="p-4 text-neutral-400 hover:text-blue-500 transition"
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
