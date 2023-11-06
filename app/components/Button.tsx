interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
    return (
        <button
            className={`p-2 border text-black border-neutral-400 rounded-lg dark:border-neutral-700 dark:text-neutral-200 w-fit h-fit hover:bg-neutral-200 dark:hover:bg-neutral-800 transition ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
