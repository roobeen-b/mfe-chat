import styled from "@emotion/styled";
import { breakpoint } from "@styles/mui/theme";
// import { breakpoint } from "@styles/mui/theme";
import { ClampedTextStyle } from "@styles/mui/utilsStyle";

export const SingleInquiryPageWrapper = styled.div`
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    --convo-options-width: 300px;
    --convo-options-width-hide: 0px;

    .si-pw {
        &-chat {
            display: none;
            ${breakpoint("sm")} {
                display: block;

                position: absolute;
                transition: left 0.3s ease;
                &-show {
                    left: 0;
                    z-index: 5;
                    width: 300px;
                }
                &-hide {
                    inset: 0;
                    opacity: 0;
                    padding: 0;
                    width: 0px;
                    left: -40%;
                    // height: 0px;
                    overflow: hidden;
                    visibility: hidden;
                }
            }
        }
        &-bg {
            display: none;
            ${breakpoint("sm")} {
                display: block;
                position: absolute;
                transition: all 0.3s ease;
                &-show {
                    inset: 0;
                    opacity: 1;
                    z-index: 4;
                    visibility: visible;
                    background-color: rgba(0, 0, 0, 0.5);
                }
                &-hide {
                    opacity: 0;
                    inset: unset;
                    visibility: hidden;
                }
            }
        }
        &-header {
            padding-bottom: 0.5rem;
            background-color: ${({ theme }) => theme?.palette.common.white};
            &-wrapper {
                gap: 1rem;
                display: flex;
                align-items: center;
                justify-content: space-between;

                padding: 1rem 0.5rem 0.5rem 1rem;
                border-bottom: 1px solid;
                border-color: #f5f5f5;
            }
            &-info {
                gap: 0.5rem;
                display: flex;
                align-items: center;
                &-title {
                    cursor: default;
                    font-size: 1.2rem;
                    word-break: break-word;
                    ${ClampedTextStyle(1)}
                }
                &-subtitle {
                }
            }
            &-icons {
                display: flex;
                min-width: 68px;
                flex-wrap: wrap;
                justify-content: center;
            }

            &-chat {
                display: none;
                ${breakpoint("sm")} {
                    display: block;
                }
            }
        }
        &-convo {
            flex: 1;
            display: flex;
            position: relative;
            &-main {
                display: flex;
                flex-direction: column;
                border: 1px solid #f5f5f5;
                &-show {
                    flex: 1;
                }
                &-hide {
                    width: 100%;
                }
            }

            &-cs {
                &-show {
                    .csw-cs {
                    }
                    .csw-cs-sm {
                        ${breakpoint("lg2")} {
                            max-width: 79%;
                        }
                    }
                }
            }
            &-cso {
                transition: all 0.3s ease;
                // max-height: calc(100vh - 185px);
                min-height: calc(
                    100vh - var(--header-height) - var(--footer-height)
                );

                &-show {
                    width: var(--convo-options-width);
                }
                &-hide {
                    padding: 0;
                    opacity: 0;
                    overflow: hidden;
                    visibility: hidden;
                    max-height: calc(100vh - 192px);
                    width: var(--convo-options-width-hide);
                    margin-right: -8px; // hack for extra space
                }

                &-bg {
                    position: absolute;
                    transition: all 0.3s ease;
                    &-hide {
                        opacity: 0;
                        inset: unset;
                        visibility: hidden;
                    }
                }

                ${breakpoint("md")} {
                    &-show {
                        top: 0;
                        right: 0;
                        bottom: 0;
                        z-index: 3;
                        position: absolute;
                    }

                    &-bg-show {
                        inset: 0;
                        opacity: 1;
                        z-index: 2;
                        position: absolute;
                        visibility: visible;
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                }
            }
        }
    }
`;
