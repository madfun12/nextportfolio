import React, { createContext, useCallback, useContext, useState } from "react";
import { FormSettings, lengthType, tones } from "../types/settings";

interface SettingContextType {
    settings: FormSettings;
    setSettings: React.Dispatch<React.SetStateAction<FormSettings>>;
}

export const FormSettingsContext = createContext<
    SettingContextType | undefined
>(undefined);

export const FormSettingsContextProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const [settings, setSettings] = useState<FormSettings>({
        lengthType: lengthType.sentences,
        length: 3,
        tone: tones.casual,
    });

    return (
        <FormSettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </FormSettingsContext.Provider>
    );
};

export const useFormSettings = () => {
    const formSettings = useContext(FormSettingsContext);
    if (!formSettings) {
        throw new Error(
            "useFormSettings must be used within the context provider",
        );
    }
    return formSettings;
};
