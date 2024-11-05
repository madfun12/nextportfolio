export enum lengthType {
    sentences = "sentences",
    words = "words",
    paragraphs = "paragraphs",
}
export enum tones {
    formal = "formal",
    casual = "casual",
    playful = "playful",
    sympathetic = "sympathetic",
    narrative = "narrative",
}
export interface FormSettings {
    lengthType: lengthType;
    length: number;
    tone: tones;
}
