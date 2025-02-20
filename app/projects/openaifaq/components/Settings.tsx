import {
    ChangeEvent,
    Dispatch,
    FormEvent,
    SetStateAction,
    useState,
} from "react";
import Gear from "./Icons/Gear";
import Modal from "./modals/Modal";
import { FormSettings, lengthType, tones } from "../types/settings";
import { useFormSettings } from "../contexts/formSettingsContext";

const Settings: React.FC = () => {
    const [expanded, setExpanded] = useState(false);
    const { settings, setSettings } = useFormSettings();
    const handleChange = (event: ChangeEvent) => {
        const { name, value } = event.target as HTMLInputElement;
        setSettings((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div
            className="settings-wrapper"
            style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "10px 10px 5px 10px",
            }}
        >
            <button
                type="button"
                onClick={() => {
                    setExpanded(true);
                }}
            >
                <Gear color="#000" size={24} />
            </button>
            {expanded && (
                <Modal>
                    <h2>Prompt Settings</h2>
                    <h3>Fine Tune to get the perfect response</h3>

                    <div>
                        <label>Length of reponse</label>
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                            }}
                        >
                            <input
                                type="text"
                                pattern="[0-9]+"
                                value={settings.length}
                                name="length"
                                onChange={(event) => handleChange(event)}
                            />
                            <select
                                value={settings.lengthType}
                                name="lengthType"
                                onChange={(event) => handleChange(event)}
                            >
                                {Object.values(lengthType).map((lengthType) => (
                                    <option key={lengthType} value={lengthType}>
                                        {lengthType}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <label>Tone of response</label>
                        <select
                            value={settings.tone}
                            name="tone"
                            onChange={(event) => handleChange(event)}
                        >
                            {Object.values(tones).map((tone) => (
                                <option key={tone} value={tone}>
                                    {tone}
                                </option>
                            ))}
                        </select>
                        <div className="modal-buttons">
                            <button
                                className="cancel"
                                type="button"
                                onClick={() => setExpanded(false)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Settings;
