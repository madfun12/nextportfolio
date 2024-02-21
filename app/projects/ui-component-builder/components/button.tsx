interface buttonProps {
    children: React.ReactNode;
    style: React.CSSProperties;
}

const Button: React.FC<buttonProps> = ({ children, style }) => {
    return (
        <button style={style} className="shadow">
            {children}
        </button>
    );
};

export default Button;
