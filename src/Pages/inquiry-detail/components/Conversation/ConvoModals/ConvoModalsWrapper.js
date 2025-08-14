import styled from "@emotion/styled";
import { breakpoint } from "@styles/mui/theme";
import { aDefaultStyle, ClampedTextStyle } from "@styles/mui/utilsStyle";
import { SearchUserWrapper2 } from "../../../../../components/SearchUser/SearchUserWrapper";

const ConvoModalsWrapper = styled.div`
    gap: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    .cmw {
        &-plm {
            gap: 1rem;
            width: 100%;
            display: flex;
            min-height: 100px;
            flex-direction: column;
            .ipw-search-user {
                .sw-autocomplete-field-popper {
                    transform: none !important;
                    margin-top: 100px !important;
                    position: relative !important;
                }
            }
            &-btn {
                gap: 0.5rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                ${breakpoint("ssm")} {
                    gap: 0.2rem;
                    flex-wrap: wrap;
                    flex-direction: column-reverse;
                }
            }
        }
        &-addMember {
            position: relative;
            ${SearchUserWrapper2}
            &-users {
                top: 40px; // height of search
                width: 100%;
                height: 80px;
                position: absolute;
                &-no {
                    width: 100%;
                    margin: auto;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                &-list {
                    gap: 0.5rem;
                    display: flex;
                    overflow-x: auto;
                    padding: 1rem 0.5rem;
                    &-item {
                        gap: 0.2rem;
                        min-width: 45px;
                        max-width: 45px;
                        width: 45px;
                        display: flex;
                        position: relative;
                        align-items: center;
                        flex-direction: column;
                        &-name {
                            text-align: center;
                            font-size: 0.7rem;
                            ${ClampedTextStyle(2)}
                            line-height: 1;
                        }
                        &-close {
                            top: -6px;
                            right: 4px;
                            font-size: 1rem;
                            cursor: pointer;
                            position: absolute;
                        }
                    }
                }
            }
        }
        &-delete-message {
            &-radios {
                &-item {
                    &-radio {
                        span {
                            font-size: 1rem;
                            font-weight: bold;
                        }
                    }
                    &-text {
                        line-height: 1.2;
                        padding-left: 2rem;
                        margin-top: -0.5rem;
                    }
                }
            }
        }
        &-seen-by {
            gap: 0;
            display: flex;
            flex-direction: column;
            &-item {
                gap: 0.5rem;
                cursor: pointer;
                display: flex;
                padding: 0.5rem;
                align-items: center;
                color: ${({ theme }) => theme?.palette.text.primary};
                border-radius: ${({ theme }) => theme?.shape.borderRadius}px;
                &:hover {
                    background-color: ${({ theme }) =>
                        theme?.palette.primary.light};
                }
                &-div {
                    line-height: 1;
                    p,
                    span {
                        line-height: 1;
                    }
                }
            }
        }
        &-reactions {
            gap: 0;
            display: flex;
            flex-direction: column;
            &-item {
                gap: 0.5rem;
                cursor: pointer;
                display: flex;
                padding: 0.5rem;
                align-items: center;
                color: ${({ theme }) => theme?.palette.text.primary};
                border-radius: ${({ theme }) => theme?.shape.borderRadius}px;
                &:hover {
                    background-color: ${({ theme }) =>
                        theme?.palette.primary.light};
                }
                &-div {
                    flex: 1;
                    line-height: 1;
                    p,
                    span {
                        line-height: 1;
                    }
                }
                &-reaction {
                }
            }
        }
    }
    ${aDefaultStyle}
`;
export { ConvoModalsWrapper };
