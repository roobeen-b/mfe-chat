import styled from "@emotion/styled";
import { ClampedTextStyle, CScrollbarStyle } from "@styles/mui/utilsStyle";
import { SearchUserWrapper2 } from "@components/SearchUser/SearchUserWrapper";
// import { breakpoint } from "@styles/mui/theme";
// import { aDefaultStyle } from "@styles/mui/utilsStyle";

const CreateGroupChatModalWrapper = styled.div`
    min-height: 70vh;
    position: relative;

    ${({ type }) =>
        type === "group"
            ? SearchUserWrapper2
            : `
      .sw-autocomplete-field-paper { 
        box-shadow: unset !important;
        .sw-autocomplete-field-listbox{
          max-height: unset;
          height: 64vh;
        } 
       }`}

    .cgc-mw {
        &-pgc {
            overflow: auto;
            max-height: 200px;
            box-shadow: unset;
            position: relative;

            ${CScrollbarStyle}
            &-ul {
            }
            &-li {
                padding: 0.5rem;
                cursor: pointer;
                &:hover {
                    background-color: ${({ theme }) =>
                        theme?.palette.background.default};
                }
                a {
                    text-transform: none;
                    text-decoration: none;
                    color: ${({ theme }) => theme?.palette.text.primary};
                }
                &-detail {
                    &-one {
                        gap: 0.5rem;
                        display: flex;
                        align-items: center;
                        &-detail {
                            gap: 0;
                            flex: 1;
                            display: flex;
                            line-height: 1;
                            flex-direction: column;
                            justify-content: center;
                            b {
                                ${ClampedTextStyle(2)}
                                line-height: 1;
                            }
                        }
                    }
                }
            }
        }
    }
`;

const CreateGroupChatPopoverWrapper = styled.div`
    .cgc-pw {
        &-menu {
            cursor: pointer;
            padding: 0.2rem 1rem;
            display: flex;
            gap: 0.5rem;
            align-items: center;
            font-size: 0.9rem;

            &:hover {
                background-color: ${({ theme }) =>
                    theme?.palette.action.disabledBackground};
            }
        }
    }
`;

export { CreateGroupChatModalWrapper, CreateGroupChatPopoverWrapper };
