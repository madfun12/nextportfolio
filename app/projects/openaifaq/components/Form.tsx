import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import Feather from "./Icons/Feather";
import Robot from "./Icons/Robot";
import Floppy from "./Icons/Floppy";
import ArrowCircle from "./Icons/ArrowCircle";
import { FAQ } from "../types/FAQ";
import { useFAQ } from "../hooks/useFAQ";
import OpenAI from "openai";
import { categoryInfo, shopInfo } from "../data/sampleData";
import { Exception } from "sass";
import axios from "axios";
import toast from "react-hot-toast";

interface formProps {
  setFAQs: Dispatch<SetStateAction<FAQ[]>>;
}

const Form: React.FC<formProps> = () => {
  const [mode, setMode] = useState("custom");
  const [loading, setLoading] = useState({
    question: false,
    answer: false,
  });

  const [errors, setErrors] = useState({
    question: false,
    answer: false,
  });

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const { faqs, setFAQs } = useFAQ();

  const generateFAQ = async () => {
    setLoading({
      question: true,
      answer: true,
    });
    setFormData({
      question: "",
      answer: "",
    });

    try {
      const response = await axios.post("/api/faq", faqs);
      setFormData(response.data);
      setLoading({
        question: false,
        answer: false,
      });
    } catch (error) {
      setLoading({
        question: false,
        answer: false,
      });
      toast.error("Error getting a response from the AI overlord");
      throw new Error(`Error getting Open AI response: ${error}`);
    }
  };

  const generateAnswer = async () => {
    setLoading({
      question: false,
      answer: true,
    });

    try {
      const response = await axios.post("/api/faq/answer", {
        question: formData.question,
      });
      setFormData((prevData) => ({
        ...prevData,
        answer: response.data.answer,
      }));
      setLoading({
        question: false,
        answer: false,
      });
    } catch (error) {
      setLoading({
        question: false,
        answer: false,
      });
      toast.error("Error getting a response from the AI overlord");
      throw new Error(`Error getting Open AI response: ${error}`);
    }
  };

  const toggleMode = (eventTarget: any) => {
    const { name } = eventTarget;
    if (name !== mode) {
      // not selecting the already selected option
      setMode(name);
      if (name === "ai") {
        // Get initial prompt response
        generateFAQ();
      } else {
        setLoading({
          question: false,
          answer: false,
        });
      }
    }
  };

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target as HTMLFormElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const saveFAQ = (event: FormEvent) => {
    event?.preventDefault();

    // Verify question input
    if (formData.question === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        question: true,
      }));
    }
    // Verify answer input
    else if (formData.answer === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        answer: true,
      }));
    } else {
      setErrors({
        question: false,
        answer: false,
      });
      setFAQs((prevState) => [...prevState, formData]);
      setFormData({
        question: "",
        answer: "",
      });
    }
  };

  return (
    <div className="form-wrapper">
      <div className="button-containers">
        <div className="mode-buttons-wrapper">
          <p>{mode === "custom" ? "Write Your Own" : "Generate an FAQ"}</p>
          <div className="mode-buttons">
            <button
              className={`mode-button ${mode === "custom" ? "selected" : ""}`}
              aria-label="Enter a custom FAQ item"
              name="custom"
              onClick={(event) => {
                event.stopPropagation();
                toggleMode(event.currentTarget);
              }}
            >
              <Feather color={mode === "custom" ? "#fff" : "#454545"} />
            </button>
            <div className="vertical-rule"></div>
            <button
              className={`mode-button ${mode === "ai" ? "selected" : ""}`}
              aria-label="Use our AI assistant to come up with an FAQ items"
              name="ai"
              onClick={(event) => {
                event.stopPropagation();
                toggleMode(event.currentTarget);
              }}
            >
              <Robot color={mode === "ai" ? "#fff" : "#454545"} />
            </button>
          </div>
        </div>
        <div className="save-new-wrapper">
          <div className="button-wrapper">
            <p
              style={{
                color:
                  loading.answer ||
                  formData.question === "" ||
                  formData.answer === ""
                    ? "#B9B9B9"
                    : "#454545",
              }}
            >
              Save
            </p>
            <button
              className="save-new"
              aria-label="Save FAQ item"
              onClick={(event) => saveFAQ(event)}
              disabled={
                loading.answer ||
                formData.question === "" ||
                formData.answer === ""
              }
            >
              <Floppy
                color={
                  loading.answer ||
                  formData.question === "" ||
                  formData.answer === ""
                    ? "#B9B9B9"
                    : "#454545"
                }
              />
            </button>
          </div>
          <div className="button-wrapper">
            <p
              style={{
                color:
                  loading.answer || mode === "custom" ? "#B9B9B9" : "#454545",
              }}
            >
              New
            </p>
            <button
              className="save-new"
              aria-label="Regenerate response"
              onClick={() => generateFAQ()}
              disabled={loading.answer || mode === "custom"}
            >
              <ArrowCircle
                color={
                  loading.answer || mode === "custom" ? "#B9B9B9" : "#454545"
                }
              />
            </button>
          </div>
        </div>
      </div>
      <form className="input-wrappers" onSubmit={(event) => saveFAQ(event)}>
        <label htmlFor="question">Question:</label>
        <div className="input-wrapper">
          <input
            type="text"
            name="question"
            id="question"
            placeholder={loading.question ? "Loading..." : "Type Question Here"}
            onChange={(event) => handleChange(event)}
            style={{
              border: errors.question
                ? "2px solid #e90000"
                : "1px solid #454545",
            }}
            value={formData.question}
            disabled={loading.question}
          />
        </div>
        {errors.question && <p style={{ color: "#ae0000" }}>Invalid input</p>}

        <label htmlFor="answer">Answer:</label>
        <div className="input-wrapper">
          <textarea
            name="answer"
            id="answer"
            placeholder={
              loading.answer
                ? "Loading..."
                : "Type Answer Here or press icon for generated answer"
            }
            onChange={(event) => handleChange(event)}
            style={{
              border: errors.answer ? "2px solid #e90000" : "1px solid #454545",
            }}
            disabled={loading.answer}
            value={formData.answer}
          />
          <button
            className="robot"
            type="button"
            onClick={() => generateAnswer()}
          >
            <Robot color="#fff" />
          </button>
        </div>
        {errors.answer && <p style={{ color: "#ae0000" }}>Invalid input</p>}
      </form>
    </div>
  );
};

export default Form;
