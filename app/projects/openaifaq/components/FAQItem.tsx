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
  onDrag: () => void;
  onDragOver: (event: any, index: number) => void;
  onDrop: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  index,
  onDrag,
  onDragOver,
  onDrop,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { faqs, setFAQs, editFAQ, currentFormFAQ } = useFAQ();

  const handleDragLeave = (event: any) => {
    const relatedTarget = event.relatedTarget; // Element that the dragged item is entering
    // Check if the related target is inside the container
    if (!event.currentTarget.contains(relatedTarget)) {
      setIsDraggingOver(false);
    }
  };

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
        key={index}
        aria-label="rearrange"
        onDragOver={(event) => onDragOver(event, index)}
        onDrop={() => {
          onDrop();
          setIsDraggingOver(false);
          setIsDragging(false);
        }}
        draggable
        onDragStart={() => {
          onDrag();
          setIsDragging(true);
        }}
        onDragEnter={() => setIsDraggingOver(true)}
        onDragLeave={(event) => {
          handleDragLeave(event);
        }}
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
        <button
          style={{
            cursor: "move",
          }}
        >
          <Arrows color="#454545" />
        </button>
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
          onClick={() => handleDelete()}
        >
          <Close color="#454545" />
        </button>
      </div>
      {isExpanded && <p className="answer">{answer}</p>}
      <div
        style={{
          backgroundColor: "#0094ff",
          width: "100%",
          height: isDraggingOver ? "3px" : "0px",
          borderRadius: "999px",
          transition: "300ms",
          margin: isDraggingOver ? "10px 0px" : "5px 0px",
        }}
      ></div>
    </>
  );
};

export default FAQItem;
