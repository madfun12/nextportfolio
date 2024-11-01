const Pencil = ({ color }: { color: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="28"
      viewBox="0 0 29 28"
      fill="none"
    >
      <path
        d="M17.7021 9.3651L19.133 10.796L5.04159 24.8874H3.61068V23.4565L17.7021 9.3651ZM23.3013 0.00195312C22.9124 0.00195312 22.5081 0.157487 22.2125 0.453002L19.3663 3.29927L25.1988 9.1318L28.0451 6.28553C28.6516 5.67894 28.6516 4.69908 28.0451 4.0925L24.4056 0.453002C24.0945 0.141934 23.7057 0.00195312 23.3013 0.00195312ZM17.7021 4.96349L0.5 22.1655V27.9981H6.33252L23.5346 10.796L17.7021 4.96349Z"
        fill={color}
      />
    </svg>
  );
};

export default Pencil;
