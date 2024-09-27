import { useState } from 'react';
import FAQItem from './FAQItem';
import { useFAQ } from '../hooks/useFAQ';

const FAQList = () => {
    const { faqs, setFAQs } = useFAQ();

    const [draggedIndex, setDraggedIndex] = useState<any>(null);

    // Start dragging: store the index of the dragged item
    const handleDragStart = (index: number) => {
        setDraggedIndex(index);
    };

    // Drag over: prevent default to allow drop
    const handleDragOver = (e: any, index: number) => {
        e.preventDefault();
    };

    // Drop: reorder the FAQs
    const handleDrop = (dropIndex: number) => {
        const updatedFAQs = [...faqs];
        const [draggedFAQ] = updatedFAQs.splice(draggedIndex, 1);
        updatedFAQs.splice(dropIndex, 0, draggedFAQ);
        setFAQs(updatedFAQs);
        setDraggedIndex(null);
    };

    return (
        <div className="faq-list-wrapper">
            <h3>For Additional Information, Read Our Frequently Asked Questions Below</h3>
            <ul className="faq-list">
                {faqs.map((faq, index) => (
                    <FAQItem
                        key={index}
                        index={index}
                        question={faq.question}
                        answer={faq.answer}
                        onDrag={() => handleDragStart(index)}
                        onDragOver={(event: any) => handleDragOver(event, index)}
                        onDrop={() => handleDrop(index)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default FAQList;
