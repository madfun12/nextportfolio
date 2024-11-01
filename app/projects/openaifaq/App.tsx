import { useState } from "react";
import FAQList from "./components/FAQList";
import Form from "./components/Form";
import { FAQ } from "./types/FAQ";
import { sampleData } from "./data/sampleData";
import FAQContext, { FAQProvider } from "./contexts/FAQContext";

const App = () => {
  const updateFAQ = () => {
    // takes an index
  };
  return (
    <div className="ai-faq">
      <FAQProvider>
        <Form />
        <FAQList />
      </FAQProvider>
    </div>
  );
};

export default App;
