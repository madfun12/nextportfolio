import { useState } from 'react';
import FAQList from './components/FAQList';
import Form from './components/Form';
import { FAQ } from './types/FAQ';
import { sampleData } from './data/sampleData';
import FAQContext from './contexts/FAQContext';

const App = () => {
    const [faqs, setFAQs] = useState<FAQ[]>(sampleData);
    return (
        <div className="ai-faq">
            <FAQContext.Provider value={{ faqs, setFAQs }}>
                <Form setFAQs={setFAQs} />
                <FAQList />
            </FAQContext.Provider>
        </div>
    );
};

export default App;
