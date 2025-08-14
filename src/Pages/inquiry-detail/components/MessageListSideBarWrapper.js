import styled from "@emotion/styled";
import {
    aDefaultStyle,
    ClampedTextStyle,
    CScrollbarStyle2,
} from "@styles/mui/utilsStyle";

const MessageListSideBarWrapper = styled.div`
    height: 100%;
    position: relative;
    padding: 1rem 0 1rem 0;
    width: var(--main-sidebar-width);
    // min-height: calc(100vh - var(--header-height) - var(--footer-height) - 16px);
    min-height: calc(100vh - var(--header-height));
    background-color: ${({ theme }) => theme.palette.common.white};
    .ms-mw {
        &-head {
            gap: 0.5rem;
            display: flex;
            padding-left: 1rem;
            align-items: center;
            &-title {
                flex: 1;
            }
            button:last-child {
                margin-right: 1rem;
            }
        }
        &-body {
            overflow-x: auto;
            max-height: calc(100vh - var(--header-height) - 62px);
            ${CScrollbarStyle2}
            &::-webkit-scrollbar-track {
                background-color: white;
            }
            &-search {
                top: 0;
                z-index: 3;
                width: 100%;
                padding: 1rem;
                position: sticky;
                background: white;
            }
            .otc-tabs {
                &-single {
                    flex: 1;
                }
            }
            &-p1 {
                padding: 1rem;
            }
            &-pr0 {
                padding-right: 0;
            }
            &-list {
                gap: 0.1rem;
                display: flex;
                max-height: calc(100%);

                flex-direction: column;
                &-item {
                    gap: 1rem;
                    padding: 1rem;
                    display: flex;
                    position: relative;
                    &-active {
                        background-color: ${({ theme }) =>
                            theme?.palette.secondary.light};
                    }

                    &:hover {
                        background-color: ${({ theme }) =>
                            theme?.palette.primary.light};
                        .ms-mw-body-list-item-delete {
                            z-index: 1;
                            opacity: 1;
                            visibility: visible;
                        }
                        .ms-mw-body-list-item-detail-line-two-more {
                            opacity: 1;
                            visibility: visible;
                            margin-right: unset;
                        }
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
                    }
                    &-detail {
                        flex: 1;
                        width: 100%;
                        overflow: hidden;
                        --2nd-width: 40px;
                        &-x {
                            word-break: break-word;
                            ${ClampedTextStyle(1)};
                        }
                        &-line {
                            gap: 0.2rem;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            &-one {
                                word-break: break-word;
                                width: calc(100% - var(--2nd-width));
                                max-width: calc(100% - var(--2nd-width));
                                ${ClampedTextStyle(1)}
                            }
                            &-two {
                                white-space: nowrap;
                                width: var(--2nd-width);
                                max-width: var(--2nd-width);
                                display: flex;
                                align-items: center;
                                justify-content: end;
                                &-more {
                                    opacity: 0;
                                    visibility: hidden;
                                    margin-right: -0.6rem;
                                    transition: margin-right 0.3s ease-in;
                                }
                                &-badge {
                                }
                                &-icon {
                                    font-size: 0.75rem;
                                    color: ${({ theme }) =>
                                        theme?.palette.text.secondary};
                                }
                            }
                        }
                        &-message {
                            line-height: 1;
                            font-size: 0.9rem;
                            color: ${({ theme }) =>
                                theme?.palette.text.secondary};
                        }
                        &-date {
                            line-height: 1;
                            font-size: 0.7rem;
                            text-align: right;
                            color: ${({ theme }) => theme?.palette.text.text2};
                        }
                    }
                    &-delete {
                        top: 0;
                        right: 0;
                        opacity: 0;
                        z-index: -1;
                        position: absolute;
                        visibility: hidden;
                        transition: all 0.3s ease-in;
                    }
                    &-divider {
                        height: 0;
                        width: 90%;
                        margin: auto;
                        border-color: #f5f5f5;
                    }
                }
                a {
                    text-transform: none;
                    text-decoration: none;
                    color: ${({ theme }) => theme?.palette.text.primary};
                }
            }
            &-ref {
                height: 0.5rem;
                margin: 0.5rem;
            }
        }
        &-ul {
            ${aDefaultStyle};
        }
    }
`;

const MessageListCompActionsWrapper = styled.div`
    gap: 0.1rem;
    display: flex;
    flex-direction: column;
    .mlc-aw {
        &-item {
            gap: 0.5rem;
            display: flex;
            min-width: 75px;
            padding: 0.5rem;
            cursor: pointer;
            align-items: center;
            color: ${({ theme }) => theme?.palette.text.primary};
            &:hover {
                background-color: ${({ theme }) =>
                    theme?.palette.primary.light};
            }
        }
    }
`;

export { MessageListSideBarWrapper, MessageListCompActionsWrapper };
