import FAQList from "./components/FAQList";
import Form from "./components/Form";
import { FAQProvider } from "./contexts/FAQContext";
import { FormSettingsContextProvider } from "./contexts/formSettingsContext";

const App = () => {
    return (
        <div className="ai-faq">
            <FAQProvider>
                <FormSettingsContextProvider>
                    <Form />
                </FormSettingsContextProvider>
                <FAQList />
            </FAQProvider>
        </div>
    );
};

export default App;
