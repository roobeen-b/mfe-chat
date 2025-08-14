"use client";
import styled from "@emotion/styled";
import { ClampedTextStyle, CScrollbarStyle } from "@styles/mui/utilsStyle";

const HeaderChatPopoverWrapper = styled.div`
    width: 20rem;
    max-height: 80vh;

    padding: 0.5rem 0 0.5rem 0.5rem;
    .hc-pw {
        &-empty-area {
            padding: 1rem;
        }
        &-divider {
            margin-bottom: 0.5rem;
        }
        &-button {
            padding-top: 0.5rem;
            padding-right: 0.5rem;
        }
        &-list {
            gap: 0.5rem;
            display: flex;
            overflow-x: auto;
            padding-right: 0.5rem;
            max-height: calc(80vh - 100px);

            flex-direction: column;
            &-item {
                gap: 1rem;
                display: flex;
                padding: 0.5rem 0.5rem;
                background-color: ${({ theme }) =>
                    theme?.palette.background.light};
                border-radius: ${({ theme }) => theme?.shape.borderRadius}px;
                &:hover {
                    background-color: ${({ theme }) =>
                        theme?.palette.background.default};
                }
                &-icon {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    &-one {
                        z-index: 2;
                        background-color: ${({ theme }) =>
                            theme?.palette.secondary.main};
                    }
                    &-many {
                        z-index: 1;
                        font-size: 0.8rem;
                        margin-top: -0.5rem;
                        background-color: ${({ theme }) =>
                            theme?.palette.secondary.main};
                    }
                }
                &-detail {
                    flex: 1;
                    &-x {
                        word-break: break-word;
                        ${ClampedTextStyle(1)};
                    }
                    &-action {
                        gap: 0.25rem;
                        display: flex;
                        line-height: 1;
                        align-items: center;
                        justify-content: end;
                    }
                    &-date {
                        line-height: 1;
                        font-size: 0.7rem;
                        color: ${({ theme }) => theme?.palette.text.text2};
                    }
                    &-avatar {
                        width: 1rem;
                        height: 1rem;
                        font-size: 0.6rem;
                        background-color: ${({ theme }) =>
                            theme?.palette.primary.main};
                    }
                    &-icon {
                        font-size: 0.7rem;
                        color: ${({ theme }) => theme?.palette.text.text2};
                    }
                    &-message {
                        line-height: 1;
                        font-size: 0.9rem;
                        color: ${({ theme }) => theme?.palette.text.secondary};
                    }
                    &-date {
                        line-height: 1;
                        font-size: 0.7rem;
                        text-align: right;
                        color: ${({ theme }) => theme?.palette.text.text2};
                    }
                }
            }
            a {
                text-transform: none;
                text-decoration: none;
                color: ${({ theme }) => theme?.palette.text.primary};
            }
            ${CScrollbarStyle}
            &::-webkit-scrollbar-track {
                background-color: white;
            }
        }
    }
`;

export { HeaderChatPopoverWrapper };
