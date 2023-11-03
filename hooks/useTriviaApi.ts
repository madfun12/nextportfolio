import { create } from "zustand";

const useTriviaStore = create((set) => ({
    started: false,
    url: "",
    startGame: () => set(() => ({ started: true })),
    restartGame: () => set(() => ({ started: false })),
    updateUrl: (url: string) => set(() => ({ url: url })),
}));

export default useTriviaStore;
