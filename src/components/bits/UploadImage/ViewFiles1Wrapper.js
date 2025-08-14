import styled from "@emotion/styled";
import { breakpoint } from "@styles/mui/theme";

const fileLengthBasedStyle = (length = 0) => {
    switch (length) {
        case 1:
            return `grid-template-columns: repeat(1, minmax(0, 1fr))`;
        case 2:
            return `grid-template-columns: repeat(2, minmax(0, 1fr))`;
        default:
            return `grid-template-columns: repeat(6, minmax(0, 1fr))`;
    }
};

const ViewFiles1Wrapper = styled.div`
    --vfw-max-h: 29rem;
    --vfw-min-h: 14rem;
    --vfw-max-1-h: 35rem;

    gap: 0.4rem;
    width: 100%;
    display: grid;
    overflow: hidden;
    grid-auto-rows: auto;
    grid-auto-columns: auto;
    ${({ length }) => fileLengthBasedStyle(length)};

    .vfw {
        &-all {
            align-content: center;
            background-color: ${({ theme }) =>
                theme?.palette.background.default};
            a {
                height: 100%;
                display: block;
                img,
                audio,
                video {
                    width: 100%;
                }
                img,
                video {
                    height: 100%;
                    max-height: var(--vfw-max-h);
                    min-height: var(--vfw-min-h);
                    background-color: ${({ theme }) =>
                        theme?.palette.grey[100]};

                    ${breakpoint("ssm")} {
                        min-height: unset;
                    }
                }
                img {
                    object-fit: cover;
                    object-position: center;
                    transition: transform 0.2s ease-in-out;
                    &:hover {
                        transform: scale(1.01);
                    }
                }
                audio {
                    margin: auto;
                }
            }
        }
        &-1 {
            grid-column: span 1 / span 1;
            a {
                img {
                    object-fit: contain;
                    max-height: var(--vfw-max-1-h);
                }
            }
        }
        &-2 {
            a {
                img {
                    // object-fit: contain;
                }
            }
        }
        &-3 {
            grid-column: span 3 / span 3;
            &:first-child {
                grid-column: span 6 / span 6;
            }
        }
        &-4 {
            grid-column: span 2 / span 2;
            &:first-child {
                grid-column: span 6 / span 6;
            }
        }
        &-5 {
            grid-column: span 2 / span 2;
            &:nth-child(-n + 2) {
                grid-column: span 3 / span 3;
            }
        }
        &-more {
            grid-column: span 2 / span 2;
        }
    }
`;

export { ViewFiles1Wrapper };
