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
                    className="block p-4 border border-neutral-700 rounded-lg relative"
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
            </MaxWrapper>
        </div>
    );
};

export default Projects;
