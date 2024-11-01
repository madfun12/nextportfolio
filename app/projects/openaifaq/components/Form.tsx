import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Feather from "./Icons/Feather";
import Robot from "./Icons/Robot";
import Floppy from "./Icons/Floppy";
import ArrowCircle from "./Icons/ArrowCircle";
import { FAQ } from "../types/FAQ";
import { useFAQ } from "../hooks/useFAQ";
import axios from "axios";
import toast from "react-hot-toast";
import Modal from "./modals/Modal";
import Button from "@/app/components/Button";

const Form: React.FC = () => {
  const [mode, setMode] = useState("custom");
  const [loading, setLoading] = useState({
    question: false,
    answer: false,
  });
  const [warn, setWarn] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const [errors, setErrors] = useState({
    question: false,
    answer: false,
  });

  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const { faqs, setFAQs, editFAQ, currentFormFAQ, clearFAQ } = useFAQ();

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

  const acceptRisk = () => {
    setMode("ai");
    generateFAQ();
    setWarn(false);
  };

  const toggleMode = (eventTarget: any) => {
    const { name } = eventTarget;
    if (name !== mode) {
      // not selecting the already selected option
      if (currentFormFAQ && name === "ai") {
        // warn user that clicking this will reset the form data
        setWarn(true);
      } else {
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
      // Question and answer are good
      setErrors({
        question: false,
        answer: false,
      });
      if (currentFormFAQ) {
        // If we're editing an FAQ item just update the item we're editing
        setFAQs((prevState) =>
          prevState.map((faq, index) =>
            prevState[index] === currentFormFAQ ? formData : faq
          )
        );
        clearFAQ();
      } else {
        // Add the faq item to the end
        setFAQs((prevState) => [...prevState, formData]);
      }
      // Reset the form data
      setFormData({
        question: "",
        answer: "",
      });
    }
  };

  useEffect(() => {
    // If there's a faq set to be edited, set the formdata to it
    if (currentFormFAQ) {
      setFormData(currentFormFAQ);
    }
  }, [currentFormFAQ]);

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
              disabled={loading.answer}
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
              disabled={loading.answer}
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
      {warn && (
        <Modal>
          <h2>Are you sure?</h2>
          <h3>
            Generating a new faq will delete the current information stored in
            this faq.
          </h3>
          <div className="modal-buttons">
            <button className="cancel" onClick={() => setWarn(false)}>
              Cancel
            </button>
            <button className="affirm" onClick={() => acceptRisk()}>
              Replace FAQ
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Form;
