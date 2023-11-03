import MaxWrapper from "@/app/components/maxWrapper";
import SectionHeader from "@/app/components/sectionHeader";
import TriviaGameComponent from "@/app/projects/trivia-game/components/TriviaGameComponent";

const TriviaGame = () => {
    return (
        <div>
            <MaxWrapper>
                <TriviaGameComponent />
            </MaxWrapper>
        </div>
    );
};

export default TriviaGame;
