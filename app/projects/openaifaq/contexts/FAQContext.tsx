import { createContext, useCallback, useState } from "react";
import { FAQ } from "../types/FAQ";
import { sampleData } from "../data/sampleData";

interface FAQContextType {
  faqs: FAQ[];
  setFAQs: React.Dispatch<React.SetStateAction<FAQ[]>>;
  currentFormFAQ: FAQ | null;
  editFAQ: (index: number) => void;
  clearFAQ: () => void;
}

const FAQContext = createContext<FAQContextType | undefined>(undefined);

export const FAQProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [faqs, setFAQs] = useState<FAQ[]>(sampleData);
  const [currentFormFAQ, setCurrentFormFAQ] = useState<FAQ | null>(null);

  const editFAQ = useCallback(
    (index: number) => {
      setCurrentFormFAQ(faqs[index]);
    },
    [faqs]
  );

  const clearFAQ = () => {
    setCurrentFormFAQ(null);
  };

  return (
    <FAQContext.Provider
      value={{ faqs, setFAQs, currentFormFAQ, editFAQ, clearFAQ }}
    >
      {children}
    </FAQContext.Provider>
  );
};

export default FAQContext;
