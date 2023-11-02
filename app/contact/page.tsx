import ContactForm from "@/app/components/contactForm";
import MaxWrapper from "@/app/components/maxWrapper";
import SectionHeader from "@/app/components/sectionHeader";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Madison Funderburk",
};

const Contact = () => {
    return (
        <div className="p-8">
            <MaxWrapper>
                <SectionHeader title="contact me" />
                <ContactForm />
            </MaxWrapper>
        </div>
    );
};

export default Contact;
