import { createContext } from 'react';
import { FAQ } from 'types/FAQ';

interface FAQContextType {
    faqs: FAQ[];
    setFAQs: React.Dispatch<React.SetStateAction<FAQ[]>>;
}

const FAQContext = createContext<FAQContextType | undefined>(undefined);

export default FAQContext;
