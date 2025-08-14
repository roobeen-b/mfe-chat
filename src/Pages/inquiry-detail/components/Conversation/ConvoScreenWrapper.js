import styled from "@emotion/styled";

import { breakpoint } from "@styles/mui/theme";
import { ClampedTextStyle, CScrollbarStyle2 } from "@styles/mui/utilsStyle";

const ConvoScreenWrapper = styled.div`
    --reply-height: ${({ hasReply }) => (hasReply ? "58px" : "0px")};
    flex: 1;
    display: flex;
    background: white;
    position: relative;
    flex-direction: column;

    .csw {
        &-cs {
            flex: 1;
            gap: 1rem;
            display: flex;
            position: relative;
            padding: 0.5rem 1rem;
            flex-direction: column;
            border-radius: ${({ theme }) => theme?.shape.borderRadius}px;
            background-color: ${({ theme }) => theme?.palette.background.paper};

            overflow: auto;
            max-height: calc(
                100vh - 258px - var(--reply-height)
            ); // hack: to contain in single screen
            ${CScrollbarStyle2}

            ${breakpoint("sm")} {
                padding: 0.5rem;
                max-height: calc(
                    100vh - 264px - var(--reply-height)
                ); // hack: to contain in single screen
            }

            &-hide {
                z-index: -1;
                opacity: 0;
                visibility: hidden;
            }
            &-overlay {
                inset: 0;
                position: absolute;
            }
            &-convo-start {
                display: flex;
                align-items: center;
                flex-direction: column;
                text-align: center;
            }
            &-fetch-old {
                width: max-content;
                margin: auto;
            }
            &-ul {
                flex: 1;
                gap: 0.5rem;
                display: flex;
                position: relative;
                flex-direction: column;
                &-down {
                    bottom: calc(
                        var(--footer-height) + 64px + 20px
                    ); // footer + send-btn + extra
                    right: 40%;
                    position: fixed;
                }
            }

            &-timestamp {
                span {
                    padding: 0.5rem;
                    background-color: ${({ theme }) =>
                        theme?.palette.primary.light};
                }
            }

            &-sm {
                gap: 0.4rem;
                display: flex;
                max-width: 69%;
                // min-width: 292px;
                overflow: hidden;
                color: ${({ theme }) => theme?.palette.text.secondary};
                ${breakpoint("ssm")} {
                    max-width: 99%;
                    // min-width: 222px;
                }
                &-left {
                    margin-left: auto;
                }

                &-avatar {
                    &-left {
                        order: 1;
                    }
                }
                &-content {
                    &-left {
                        text-align: right;
                    }
                }

                &-isEdited {
                    cursor: pointer;
                    &-ul {
                        gap: 0.1rem;
                        display: flex;
                        margin-bottom: 0.1rem;
                        flex-direction: column;
                        &-li {
                            &-msg {
                                line-height: 1.2;
                                display: inline-block;
                                border-radius: ${({ theme }) =>
                                    theme?.shape.borderRadius}px;
                                padding: 0.2rem 0.5rem;
                                background-color: ${({ theme }) =>
                                    theme?.palette.background.default};
                            }
                        }
                    }
                }

                &-msg-reply {
                    z-index: 1;
                    opacity: 0.8;
                    line-height: 1;
                    min-width: 90px;
                    cursor: pointer;
                    font-size: 0.8rem;
                    position: relative;
                    display: inline-block;
                    // width: min-content;
                    margin-bottom: -1rem;
                    text-decoration: none;
                    padding: 0.5rem 0.5rem 1rem;
                    border-radius: ${({ theme }) =>
                        theme?.shape.borderRadius}px;
                    color: ${({ theme }) => theme?.palette.text.primary};
                    background-color: ${({ theme }) =>
                        theme?.palette.background.default};
                    &-left {
                        text-align: right;
                        margin-left: auto;
                        // border-top-right-radius: 0;
                    }
                    &-right {
                        // border-top-left-radius: 0;
                    }
                    &-msg {
                        text-align: inherit;
                        ${ClampedTextStyle(1)};
                    }
                }
                &-msg-wrapper {
                    margin-left: auto;
                    display: block;
                }
                &-msg {
                    z-index: 2;
                    padding: 0.5rem;
                    min-width: 100px;
                    position: relative;
                    display: inline-block;
                    // width: min-content;
                    white-space: pre-wrap;
                    word-break: break-all;
                    border-radius: ${({ theme }) =>
                        theme?.shape.borderRadius}px;
                    &-left {
                        margin-left: auto;
                        // border-top-right-radius: 0;
                        color: ${({ theme }) => theme?.palette.common.white};
                        background-color: ${({ theme }) =>
                            theme?.palette.primary.main};
                        .igf-lcw {
                            margin-left: auto;
                        }
                    }
                    &-right {
                        // border-top-left-radius: 0;
                        color: ${({ theme }) => theme?.palette.common.black};
                        background-color: ${({ theme }) =>
                            theme?.palette.secondary.light};
                    }
                    &-has-reactions {
                        margin-bottom: 0.5rem;
                    }
                    &-searched-message {
                        animation: grow-shrink 0.3s ease-out 0.5s;
                        border: 1px solid
                            ${({ theme }) => theme?.palette.common.black};
                    }
                    &-only-emoji {
                        font-size: 2rem;
                        min-width: unset;
                        padding: 0.2rem 0rem;
                        background-color: transparent;
                        // margin-top: -0.5rem;
                        .csw-cs-sm-msg-reactions {
                            bottom: -0.2rem;
                        }
                    }
                    &-reactions {
                        gap: 0.1rem;
                        display: flex;
                        right: 0.2rem;
                        cursor: pointer;
                        font-size: 0.8rem;
                        padding: 0 0.2rem;
                        position: absolute;
                        border-radius: 1rem;
                        white-space: nowrap;
                        background-color: ${({ theme }) =>
                            theme?.palette.common.white};
                    }
                }
                &-attachments {
                    width: unset;
                    line-height: 1;
                    position: relative;

                    color: ${({ theme }) => theme?.palette.text.primary};
                    &-list {
                        .vf-it {
                            &-list {
                                --g-repeat: 3;
                                gap: 0.1rem;
                                display: grid;
                                grid-auto-flow: dense;
                                align-content: center;
                                justify-content: center;
                                grid-template-rows: auto;
                                grid-template-columns: repeat(
                                    var(--g-repeat),
                                    1fr
                                );

                                ${breakpoint("sm")} {
                                    --g-repeat: 2;
                                    grid-template-columns: 1fr 1fr;
                                }
                                ${breakpoint("xs")} {
                                    --g-repeat: 1;
                                    grid-template-columns: 1fr;
                                }

                                &-3 {
                                    --g-repeat: 3;
                                    .vf-it {
                                        &-list {
                                            &-item {
                                                &-1 {
                                                    grid-row: span 2;
                                                    grid-column: span 2;
                                                    ${breakpoint("sm")} {
                                                        grid-row: span 2;
                                                        grid-column: span 2;
                                                    }
                                                }
                                                &-2 {
                                                    grid-row: 1;
                                                    grid-column: 3;
                                                    ${breakpoint("sm")} {
                                                        grid-row: 3;
                                                        grid-column: 1;
                                                    }
                                                }
                                                &-3 {
                                                    grid-row: 2;
                                                    grid-column: 3;
                                                    ${breakpoint("sm")} {
                                                        grid-row: 3;
                                                        grid-column: 2;
                                                    }
                                                }
                                                ${breakpoint("xs")} {
                                                    grid-row: span 1;
                                                    grid-column: span 1;
                                                }
                                            }
                                        }
                                    }
                                }

                                &-2 {
                                    --g-repeat: 2;
                                    .vf-it {
                                        &-list {
                                            &-item {
                                                &-1 {
                                                    grid-row: 1;
                                                    grid-column: 1;
                                                }
                                                &-2 {
                                                    grid-row: 1;
                                                    grid-column: 2;
                                                }
                                                ${breakpoint("xs")} {
                                                    grid-row: span 1;
                                                    grid-column: span 1;
                                                }
                                            }
                                        }
                                    }
                                }

                                &-1 {
                                    --g-repeat: 1;
                                }

                                &-item {
                                    cursor: pointer;
                                    border-radius: 0;
                                    justify-self: end;
                                    background-color: ${({ theme }) =>
                                        theme?.palette.background.light};
                                    &:hover {
                                        scale: 1.02;
                                    }
                                    &-1 {
                                        align-self: center;
                                    }

                                    &-avatar {
                                        width: 100%;
                                        height: 100%;

                                        max-width: 300px;
                                        max-height: 300px;

                                        ${breakpoint("xs")} {
                                            max-width: 200px;
                                            max-height: 200px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    &-left {
                        .vf-it-list {
                            margin-left: auto;
                            justify-content: end;
                        }
                    }
                    &-right {
                        .vf-it-list {
                            direction: rtl;
                        }
                    }
                    &-reactions {
                        gap: 0.1rem;
                        display: flex;
                        right: 0.2rem;
                        cursor: pointer;
                        font-size: 0.8rem;
                        padding: 0 0.2rem;
                        position: absolute;
                        border-radius: 1rem;
                        white-space: nowrap;
                        bottom: -0.2rem;
                        background-color: ${({ theme }) =>
                            theme?.palette.common.white};
                    }
                }
                &-time {
                    // font-size: 0.6rem;
                    min-width: 115px;
                    // color: ${({ theme }) => theme?.palette.text.secondary};
                    &-right {
                        // text-align: right;
                    }
                    &-left {
                        // text-align: left;
                    }
                }
                &:hover {
                    .csw-cs-sm-reply {
                        opacity: 1;
                        visibility: visible;
                    }
                }
                &-reply {
                    opacity: 0;
                    width: 65px;
                    visibility: hidden;
                    position: relative;

                    ${breakpoint("ssm")} {
                        width: 40px;
                    }
                    &-epc {
                        position: absolute;
                        // transform: translate(-50%, 0);
                        &-left {
                            left: 0;
                        }
                        &-right {
                            right: 0;
                        }
                        &-picker {
                            height: 40px;
                            padding: 2px 0;
                            --epr-emoji-size: 20px;
                        }
                    }
                    &-btns {
                        right: 0;
                        top: 0;
                        bottom: 0;
                        position: absolute;

                        display: flex;
                        align-items: center;
                        align-content: center;
                        justify-content: center;
                        ${breakpoint("ssm")} {
                            flex-wrap: wrap;
                        }
                        &-right {
                            left: 0;
                            right: unset;
                        }
                        button {
                            padding: 1px;
                        }
                    }
                    &-left {
                        order: -1;
                    }
                    &-btn {
                        color: lightgrey;
                        &-right {
                            margin-left: -2px;
                        }
                        &-left {
                            order: 1;
                            margin-right: -2px;
                        }
                    }
                }
                &-seen-by {
                    gap: 0.2rem;
                    display: flex;
                    flex-wrap: wrap;
                    cursor: pointer;
                    margin-left: auto;
                    margin-right: 2rem;
                    &-additional {
                        width: 20px;
                        height: 20px;
                        font-size: 0.6rem;
                        border-width: 1px;
                        border-color: ${({ theme }) =>
                            theme?.palette.common.white};
                        background-color: ${({ theme }) =>
                            theme?.palette.secondary.main};
                    }
                    &-avatar {
                        border-width: 1px;
                        border-color: ${({ theme }) =>
                            theme?.palette.common.white};
                    }
                }
            }
            &-last {
                height: 1px;
                width: 100%;
                // bottom: 0%;
                // position: sticky;
            }
        }

        &-epc {
            right: 10px;
            bottom: 60px;
            position: absolute;
            .epr-body {
                ${CScrollbarStyle2}
            }
        }
        &-smb {
            padding: 0.5rem;
            background: ${({ theme }) => theme?.palette.common.white};

            &-field-wrapper {
                position: relative;
            }
            &-field-InputProps {
                padding: 0.5rem;
                transition: all 0.3s ease;

                &-hasFiles {
                    padding-top: 60px;
                }
            }
            &-field-files {
                ${CScrollbarStyle2}
                .vf-it {
                    &-list {
                        &-item {
                            &-text {
                                ${ClampedTextStyle(2)}
                                line-height: 1.25;
                            }
                        }
                    }
                }
            }
        }
        &-rts {
            margin: auto;
            width: calc(100% - 1rem);
            opacity: 0.9;
            display: flex;
            padding: 0.5rem;
            overflow: hidden;
            justify-content: space-between;
            border-radius: ${({ theme }) => theme?.shape.borderRadius}px;
            // border-top-left-radius: 0.5rem;
            // border-top-right-radius: 0.5rem;
            background-color: #f5f5f5;
            &-msg {
                flex: 1;
                display: flex;
                flex-direction: column;
                line-height: 1;
                text-transform: none;
                text-decoration: none;
                color: ${({ theme }) => theme?.palette.text.primary};
                &-content {
                    ${ClampedTextStyle(1)}
                }
            }
            &-btn {
                &-icn {
                    font-size: 1rem;
                }
            }
        }
    }
`;

const ConvoSectionActionsWrapper = styled.div`
    gap: 0.1rem;
    display: flex;
    flex-direction: column;
    .cs-aw {
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
export { ConvoScreenWrapper, ConvoSectionActionsWrapper };
