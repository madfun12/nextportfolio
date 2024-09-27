const DownCaret = ({ color }: { color: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="8" viewBox="0 0 17 8" fill="none">
            <path d="M16.5 0.000244141H0.5L8.5 8.00024L16.5 0.000244141Z" fill={color} />
        </svg>
    );
};

export default DownCaret;
