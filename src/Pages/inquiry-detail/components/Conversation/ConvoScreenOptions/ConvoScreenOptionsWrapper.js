import styled from "@emotion/styled";

import {
    aDefaultStyle,
    ClampedTextStyle,
    CScrollbarStyle2,
} from "@styles/mui/utilsStyle";

export const ConvoScreenOptionsWrapper = styled.div`
    padding: 0;
    padding-top: 1rem;
    overflow: auto;

    background-color: #fff;
    max-height: calc(100vh - var(--header-height));
    ${CScrollbarStyle2};

    .cs-ow {
        &-avatars {
            margin-bottom: 0.5rem;
            justify-content: center;
        }
        &-name {
        }
        &-p1 {
            padding: 1rem;
        }
        &-py {
            padding: 0 1rem;
        }
        &-pt0 {
            padding-top: 0;
        }
        &-pb0 {
            padding-bottom: 0;
        }
        &-flex {
            gap: 1rem;
            display: flex;
            justify-content: space-between;
        }
        &-head {
            text-align: center;
            &-name {
                line-height: 1;
                padding-top: 0.5rem;
            }
            &-members {
                line-height: 1;
            }
            &-image {
                position: relative;
                &-avatar {
                    margin: auto;
                }
                &-choose-file {
                    .dcw-div {
                        overflow: unset;
                    }
                }
                &-edit {
                    bottom: 0;
                    left: 54%;
                    position: absolute;
                    background-color: ${({ theme }) =>
                        theme?.palette.background.default};
                }
            }
        }
        &-divider {
            height: 0;
            width: 90%;
            margin: auto;
            border-color: #f5f5f5;
        }
        &-body {
            &-members {
                gap: 0.5rem;
                display: flex;
                &-grp {
                    &-additional {
                        color: #fff;
                        border: 3px solid #fff;
                        background-color: ${({ theme }) =>
                            theme?.palette.primary.main};
                    }
                    &-avatar {
                        border: 3px solid #fff;
                        background-color: ${({ theme }) =>
                            theme?.palette.primary.main};
                    }
                }
            }
            &-medias {
                gap: 0.5rem;
                display: flex;
                flex-wrap: wrap;
                &-li {
                    border-radius: ${({ theme }) =>
                        theme?.shape.borderRadius}px;
                }
            }
        }
        &-members-list {
            display: flex;
            flex-direction: column;

            overflow: auto;
            max-height: calc(
                100vh - 200px
            ); // hack: to contain in single screen
            ${CScrollbarStyle2}
            &-li {
                gap: 0.5rem;
                display: flex;
                padding: 1rem;
                align-items: center;
                &:hover {
                    background-color: ${({ theme }) =>
                        theme?.palette.primary.light};
                }
                &-detail {
                    flex: 1;
                    line-height: 1;
                    &-name {
                        ${ClampedTextStyle(1)}
                    }
                    &-email {
                        line-height: 1;
                    }
                    &-add {
                        cursor: pointer;
                    }
                }
            }
        }
        &-media-list {
            gap: 0.5rem;
            display: flex;
            padding: 0 0.5rem;
            flex-direction: column;

            overflow: auto;
            max-height: calc(
                100vh - 160px
            ); // hack: to contain in single screen
            ${CScrollbarStyle2}

            &-ul {
                gap: 0.5rem;
                display: flex;
                flex-wrap: wrap;

                &-li {
                    display: flex;
                    cursor: pointer;
                    border-radius: ${({ theme }) =>
                        theme?.shape.borderRadius}px;
                    background-color: ${({ theme }) =>
                        theme?.palette.primary.light};
                    // &-image {
                    //   object-fit: contain;
                    // }
                    &-doc {
                        gap: 0.2rem;
                        display: flex;
                        align-items: center;
                        flex-direction: column;
                        padding: 0.5rem 0.2rem 0.4rem 0.2rem;
                        border-radius: ${({ theme }) =>
                            theme?.shape.borderRadius}px;

                        width: 89px;
                        &-icon {
                            width: 60px;
                            height: 60px;
                        }
                        &-name {
                            width: 100%;
                            text-align: center;
                            ${ClampedTextStyle(2)}
                            line-height: 1;
                        }
                    }
                }
            }
        }
        &-search-list {
            gap: 0.5rem;
            display: flex;
            flex-direction: column;

            overflow: auto;
            max-height: calc(100% - 100px); // hack: to contain in single screen
            ${CScrollbarStyle2}
            &-ul {
                gap: 0.5rem;
                display: flex;
                flex-wrap: wrap;
                flex-direction: column;
                justify-content: center;

                &-li {
                    gap: 0.5rem;
                    display: flex;
                    padding: 1rem;
                    cursor: pointer;
                    align-items: center;
                    border-radius: ${({ theme }) =>
                        theme?.shape.borderRadius}px;
                    &:hover {
                        background-color: ${({ theme }) =>
                            theme?.palette.primary.light};
                    }
                    &-body {
                        width: 100%;
                    }
                    &-name {
                        // width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }
                    &-message {
                        line-height: 1.3;
                        max-width: 218px;
                        word-wrap: break-word;
                    }
                    &-divider {
                        height: 0;
                        width: 90%;
                        margin: auto;
                        border-color: #f5f5f5;
                    }
                }
            }
        }
        &-privacy {
            display: flex;
            flex-direction: column;
            &-x {
                gap: 0.5rem;
                display: flex;
                padding: 1rem;
                cursor: pointer;
                align-items: center;
                &:hover {
                    background-color: ${({ theme }) =>
                        theme?.palette.primary.light};
                }
            }
        }
        &-p_5pl_0 {
            padding: 0.5rem 0.5rem 0.5rem 0;
        }
    }
`;

export const ConvoScreenOptionsMembersOptionsWrapper = styled.div`
    gap: 0.1rem;
    display: flex;
    flex-direction: column;
    ${aDefaultStyle}
    .cs-ow-cp {
        &-item {
            gap: 0.5rem;
            display: flex;
            padding: 0.5rem;
            align-items: center;
            color: ${({ theme }) => theme?.palette.text.primary};
            &:hover {
                background-color: ${({ theme }) =>
                    theme?.palette.secondary.light};
            }
        }
    }
`;
