/* eslint-disable react/no-unescaped-entities */
import { BsArrowUpRightSquare } from "react-icons/bs";
import MaxWrapper from "../components/maxWrapper";
import SectionHeader from "../components/sectionHeader";

const Projects = () => {
    return (
        <div className="p-4">
            <MaxWrapper>
                <SectionHeader title="projects" />
                <a
                    href="/projects/trivia-game"
                    className="block p-4 border border-neutral-700 rounded-lg relative mb-3"
                >
                    <h2 className="font-bold text-2xl mb-2 dark:text-neutral-200">
                        Trivia Game
                    </h2>
                    <BsArrowUpRightSquare
                        className="absolute right-2 top-2 dark:text-neutral-200"
                        size={24}
                    />
                    <p className="dark:text-neutral-200">
                        This allows you to create a trivia game tailored to you.
                        Choose your options and see how sharp your trivia skills
                        are!
                    </p>
                </a>
                <a
                    href="https://library20240110102252.azurewebsites.net"
                    className="block p-4 border border-neutral-700 rounded-lg relative mb-3"
                >
                    <h2 className="font-bold text-2xl mb-2 dark:text-neutral-200">
                        My Library
                    </h2>
                    <BsArrowUpRightSquare
                        className="absolute right-2 top-2 dark:text-neutral-200"
                        size={24}
                    />
                    <p className="dark:text-neutral-200">
                        A web app hosted on azure that serves as an online
                        catalogue for my home library.
                        <br />
                        An ASP.Net web application using MVC architecture and
                        that connects to an azure hosted SQL database. It's a
                        tech stack very similar to what many large enterprises
                        might use.
                    </p>
                </a>
            </MaxWrapper>
        </div>
    );
};

export default Projects;
