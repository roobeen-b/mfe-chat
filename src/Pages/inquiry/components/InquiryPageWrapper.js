import styled from "@emotion/styled";
// import { breakpoint } from "@styles/mui/theme";
import { ClampedTextStyle, CScrollbarStyle } from "@styles/mui/utilsStyle";

export const InquiryPageWrapper = styled.div`
    gap: 1rem;
    display: flex;
    flex-direction: column;

    .ipw {
        &-header {
            gap: 1rem;
            display: flex;
            flex-wrap: wrap;
            position: relative;
            justify-content: space-between;
            u {
                flex: 1;
            }
        }
        &-filter {
            gap: 1rem;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            &-input {
                flex: 1;
                max-width: 260px;
            }
        }
        &-search-user {
            max-width: 444px;
        }
        &-empty-area {
            margin-top: 2rem;
        }
        &-list {
            gap: 0.5rem;
            display: flex;
            overflow-x: auto;
            flex-direction: column;
            &-item {
                gap: 0.8rem;
                display: grid;
                text-transform: none;
                text-decoration: none;
                padding: 0.5rem 0.5rem;
                background-color: #f4f4f4;
                color: ${({ theme }) => theme?.palette.text.primary};
                grid-template-columns: repeat(5, minmax(100px, 1fr));
                border-radius: ${({ theme }) => theme?.shape.borderRadius}px;
                &:not(:first-child) {
                    cursor: pointer;
                    &:hover {
                        background-color: ${({ theme }) =>
                            theme?.palette.action.hover};
                    }
                }

                &-x {
                    word-break: break-word;
                }
                &-name {
                    grid-column: span 2;
                }
                &-message {
                    ${ClampedTextStyle(2)};
                }
                &-date {
                    line-height: 1.2;
                }
                &-name-detail {
                    &-one {
                        gap: 0.5rem;
                        display: flex;
                        align-items: center;
                        &-icon {
                            background-color: ${({ theme }) =>
                                theme?.palette.secondary.main};
                        }
                        &-detail {
                            gap: 0.1rem;
                            display: flex;
                            line-height: 1;
                            flex-direction: column;
                            i {
                                font-size: 0.8rem;
                            }
                        }
                    }
                }
            }
            ${CScrollbarStyle}
        }
    }
`;
