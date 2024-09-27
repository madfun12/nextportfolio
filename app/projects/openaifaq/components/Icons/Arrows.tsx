const Arrows = ({ color }: { color: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
            <path
                d="M18.5 36.0002C8.6 36.0002 0.5 27.9002 0.5 18.0002C0.5 8.10024 8.6 0.000244141 18.5 0.000244141C28.4 0.000244141 36.5 8.10024 36.5 18.0002C36.5 27.9002 28.4 36.0002 18.5 36.0002ZM18.5 3.00024C10.25 3.00024 3.5 9.75024 3.5 18.0002C3.5 26.2502 10.25 33.0002 18.5 33.0002C26.75 33.0002 33.5 26.2502 33.5 18.0002C33.5 9.75024 26.75 3.00024 18.5 3.00024Z"
                fill={color}
            />
            <path
                d="M23 16.5002C22.55 16.5002 22.25 16.3502 21.95 16.0502L18.5 12.6002L15.05 16.0502C14.45 16.6502 13.55 16.6502 12.95 16.0502C12.35 15.4502 12.35 14.5502 12.95 13.9502L17.45 9.45024C18.05 8.85024 18.95 8.85024 19.55 9.45024L24.05 13.9502C24.65 14.5502 24.65 15.4502 24.05 16.0502C23.75 16.3502 23.45 16.5002 23 16.5002Z"
                fill={color}
            />
            <path
                d="M18.5 27.0002C18.05 27.0002 17.75 26.8502 17.45 26.5502L12.95 22.0502C12.35 21.4502 12.35 20.5502 12.95 19.9502C13.55 19.3502 14.45 19.3502 15.05 19.9502L18.5 23.4002L21.95 19.9502C22.55 19.3502 23.45 19.3502 24.05 19.9502C24.65 20.5502 24.65 21.4502 24.05 22.0502L19.55 26.5502C19.25 26.8502 18.95 27.0002 18.5 27.0002Z"
                fill={color}
            />
        </svg>
    );
};

export default Arrows;
