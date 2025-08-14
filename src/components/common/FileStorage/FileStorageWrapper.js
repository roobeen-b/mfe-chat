import styled from "@emotion/styled";
import { breakpoint } from "@styles/mui/theme";

export const FileStorageModalContentWrapper = styled.div`
    --file-width-modal: 100px;
    --file-height-modal: 100px;

    gap: 1rem;
    display: flex;
    flex-direction: column;

    .fsw-modal {
        min-height: 60vh;
        .fsw-list {
            gap: 0.5rem;
            &-single {
                &-file {
                    width: var(--file-width-modal);
                    height: var(--file-height-modal);
                }
                &-name {
                    padding-bottom: 0;
                    width: var(--file-width-modal);
                    input {
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
    .fs-mc {
        &-btns {
            text-align: right;
            button:first-child {
                width: 200px;
                max-width: 100%;
            }
        }
    }
`;
export const FileStorageWrapper = styled.div`
    --file-width: 200px;
    --file-height: 200px;
    --file-padding: 0.5rem;

    gap: 1rem;
    display: flex;
    min-height: 70vh;
    position: relative;
    flex-direction: column;
    .fsw {
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
            &-select {
                min-width: 100px;
            }
        }
        &-choose-file {
            right: 0;
            bottom: 0;
            z-index: 3;
            min-width: 120px;
            position: absolute;
            &-fab {
                box-shadow: none;
            }
        }
        &-empty-area {
            margin-top: 2rem;
        }
        &-list {
            gap: 2rem;
            display: flex;
            flex-wrap: wrap;

            ${breakpoint("sm")} {
                gap: 1rem;
                justify-content: center;
            }

            &-single {
                display: flex;
                cursor: pointer;
                position: relative;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                background-color: white;
                box-shadow: 1px 1px 1px rgb(224 224 224);

                ${breakpoint("xs")} {
                    width: 100%;
                }

                &-file {
                    display: flex;
                    position: relative;
                    justify-content: center;
                    width: var(--file-width);
                    height: var(--file-height);
                    padding: var(--file-padding);

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    video {
                        width: 100%;
                        height: 100%;
                    }
                    .app-comp {
                        width: 80%;
                        height: 80%;
                        font-size: 6rem;
                    }
                    a {
                        width: calc(var(--file-width) - var(--file-padding));
                        height: calc(var(--file-height) - var(--file-padding));
                    }
                }
                &-name {
                    padding: 0;
                    border: none;
                    display: flex;
                    text-align: center;
                    padding-bottom: 0.5rem;
                    width: var(--file-width);
                    input {
                        padding: 0.1rem 0.5rem;
                        border: 1px dashed transparent;
                        &:disabled {
                            -webkit-text-fill-color: unset;
                            color: ${({ theme }) =>
                                theme?.palette.text.primary};
                        }
                    }
                    fieldset {
                        border: none;
                    }
                    &-edit {
                        input {
                            border-color: lightgrey;
                        }
                        background-color: ${({ theme }) =>
                            theme?.palette.common.white};
                    }
                    &-btn {
                        gap: 0.1rem;
                        button {
                            padding: 0;
                            svg {
                                font-size: 1rem;
                            }
                        }
                    }
                }
                &-type {
                    top: 0;
                    right: 0;
                    color: white;
                    font-size: 0.8rem;
                    position: absolute;
                    padding: 0.2rem 0.5rem;
                    background-color: #818181;
                }
                &-checkbox {
                    top: 0;
                    left: 0;
                    padding: 0.2rem;
                    border-radius: 0;
                    background: white;
                    position: absolute;
                }
                &-action {
                    top: 75%;
                    z-index: 1;
                    left: auto;
                    right: auto;
                    padding: 0.2rem;
                    position: absolute;
                    background-color: white;
                    transition: all 0.3s, visibility 0s 0.3s;

                    opacity: 0;
                    visibility: hidden;
                }
                &:hover {
                    .fsw-list-single-file {
                        filter: blur(1px);
                    }
                    .fsw-list-single-action {
                        top: 35%;
                        opacity: 1;
                        visibility: visible;
                        transition-delay: 0s;
                    }
                }
            }
        }
    }
`;
