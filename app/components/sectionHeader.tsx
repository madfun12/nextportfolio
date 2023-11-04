interface sectionHeaderProps {
    title: string;
    right?: boolean;
    subtitle?: string;
}
const SectionHeader: React.FC<sectionHeaderProps> = ({
    title,
    right,
    subtitle,
}) => {
    return (
        <div className="mb-2">
            <h2
                className={`dark:text-neutral-200 text-5xl font-bold tracking-tighter ${
                    right ? "text-right" : ""
                }`}
            >
                {title}
            </h2>
            {subtitle && (
                <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
