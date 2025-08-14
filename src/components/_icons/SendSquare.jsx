import SvgIcon from "@mui/material/SvgIcon";

export const SendSquare = (props) => {
    return (
        <SvgIcon {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 38 38"
            >
                <rect
                    x="5"
                    y="3"
                    rx="4"
                    width="28"
                    height="28"
                    fill="currentColor"
                />
                <path
                    fill="#fff"
                    d="m14 22 10-4 1-1a1 1 0 0 0-1-1l-10-4a1 1 0 0 0-1 0 1 1 0 0 0 0 1v2l1 1 8 1-8 1-1 1v2l1 1Z"
                />
            </svg>
        </SvgIcon>
    );
};
