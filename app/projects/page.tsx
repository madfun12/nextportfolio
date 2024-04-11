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
                    href="/sudokusolver/index.html"
                    className="block p-4 border border-neutral-700 rounded-lg relative mb-3"
                >
                    <h2 className="font-bold text-2xl mb-2 dark:text-neutral-200">
                        Sudoku Solver
                    </h2>
                    <BsArrowUpRightSquare
                        className="absolute right-2 top-2 dark:text-neutral-200"
                        size={24}
                    />
                    <p className="dark:text-neutral-200">
                        Very simple sudoku solving algorithm. It uses a
                        backtracking method, which essentially starts from 1,
                        goes through the puzzle until there are no more valid
                        numbers, and then works backwards, increasing each spot
                        until the puzzle is solved. Due to the ridiculous amount
                        of different permutations possible with a sudoku puzzle,
                        algorithms are usually pretty inefficient.
                    </p>
                </a>
                <a
                    href="/mandelbrot-explorer/index.html"
                    className="block p-4 border border-neutral-700 rounded-lg relative mb-3"
                >
                    <h2 className="font-bold text-2xl mb-2 dark:text-neutral-200">
                        Mandelbrot Explorer
                    </h2>
                    <BsArrowUpRightSquare
                        className="absolute right-2 top-2 dark:text-neutral-200"
                        size={24}
                    />
                    <p className="dark:text-neutral-200">
                        A page that allows you to explore a graphical
                        representation of the mandelbrot set. The mandelbrot set
                        is an example of a fractal, a shape that contains
                        incredibly complex and mesmerizingly beautiful recursive
                        patterns that go on and on at smaller and smaller
                        scales.
                    </p>
                </a>
            </MaxWrapper>
        </div>
    );
};

export default Projects;
