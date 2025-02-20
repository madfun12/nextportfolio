import { useState } from "react";
import Arrows from "./Icons/Arrows";
import Close from "./Icons/Close";
import { useFAQ } from "../hooks/useFAQ";
import DownCaret from "./Icons/DownCaret";
import Pencil from "./Icons/Pencil";

interface FAQItemProps {
    question: string;
    answer: string;
    index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const { faqs, setFAQs, editFAQ, currentFormFAQ } = useFAQ();

    const handleDelete = () => {
        setFAQs((prevFAQS) => prevFAQS?.filter((_, i) => i !== index));
    };
    return (
        <>
            <div
                className={`
                    faq-item
                    ${
                        faqs[index] === currentFormFAQ
                            ? "border-4 rounded-xl border-blue-500"
                            : ""
                    }
                `}
            >
                <button
                    className={`drop-down ${isExpanded ? "expanded" : ""}`}
                    role="button"
                    aria-label={`show answer for "${question}"`}
                    onClick={() => setIsExpanded((prevState) => !prevState)}
                >
                    <p>{question}</p>
                    <DownCaret color="#454545" />
                </button>
                <div
                    style={{
                        cursor: "move",
                    }}
                    className="drag-icon"
                >
                    <Arrows color="#454545" />
                </div>
                <button
                    aria-label="edit faq item"
                    className="edit"
                    onClick={() => {
                        editFAQ(index);
                    }}
                >
                    <Pencil color="#454545" />
                </button>
                <button
                    aria-label="remove faq item"
                    className="close"
                    onClick={handleDelete}
                >
                    <Close color="#454545" />
                </button>
            </div>
            {isExpanded && <p className="answer">{answer}</p>}
        </>
    );
};

export default FAQItem;
