import { useContext } from 'react';
import FAQContext from '../contexts/FAQContext'; // Import your context

export const useFAQ = () => {
    const context = useContext(FAQContext);

    if (context === undefined) {
        throw new Error('useFAQ must be used within a FAQProvider');
    }

    return context;
};
