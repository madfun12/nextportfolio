import { useState } from "react";
import FAQItem from "./FAQItem";
import { useFAQ } from "../hooks/useFAQ";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { FAQ } from "../types/FAQ";

const FAQList = () => {
    const { faqs, setFAQs } = useFAQ();
    const grid = faqs.length;

    const reorder = (list: FAQ[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };
    const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: grid * 2,
        margin: `0 0 ${grid}px 0`,

        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables
        ...draggableStyle,
    });

    const getListStyle = (isDraggingOver: boolean) => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: grid,
        width: 250,
    });

    function onDragEnd(result: any) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const orderedFAQs = reorder(
            faqs,
            result.source.index,
            result.destination.index
        );

        setFAQs(orderedFAQs);
    }
    return (
        <div className="faq-list-wrapper">
            <h3>
                For Additional Information, Read Our Frequently Asked Questions
                Below
            </h3>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="list">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="faq-list"
                        >
                            {faqs.map((faq, index) => (
                                <Draggable
                                    key={index}
                                    index={index}
                                    draggableId={`id-${index}`}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <FAQItem
                                                question={faq.question}
                                                answer={faq.answer}
                                                index={index}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default FAQList;
