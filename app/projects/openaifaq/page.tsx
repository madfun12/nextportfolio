"use client";
import { useState } from "react";
import { FAQ } from "./types/FAQ";
import { sampleData } from "./data/sampleData";
import FAQContext from "./contexts/FAQContext";
import Form from "./components/Form";
import FAQList from "./components/FAQList";
import "./index.scss";
import App from "./App";

const TriviaGame = () => {
  const [faqs, setFAQs] = useState<FAQ[]>(sampleData);
  return <App />;
};

export default TriviaGame;
