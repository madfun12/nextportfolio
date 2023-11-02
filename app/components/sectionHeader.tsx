interface sectionHeaderProps {
    title: string;
    right?: boolean;
}
const SectionHeader: React.FC<sectionHeaderProps> = ({ title, right }) => {
    return (
        <h2
            className={`text-5xl font-bold tracking-tighter p-4 ${
                right ? "text-right" : ""
            }`}
        >
            {title}
        </h2>
    );
};

export default SectionHeader;
