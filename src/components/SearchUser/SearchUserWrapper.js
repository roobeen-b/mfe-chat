import styled from "@emotion/styled";
import { ClampedTextStyle } from "@styles/mui/utilsStyle";

const SearchUserWrapper2 = `.ipw-search-user {
  .sw-autocomplete-field-popper {
    transform: none !important;
    margin-top: 80px !important;
    margin-bottom: 1rem !important;
    position: relative !important;
  }
  .sw-autocomplete-field-paper {
    box-shadow: unset !important;
  }
  .sw-autocomplete-field-listbox {
    max-height: 250px;
    .rsu-ow {
      border: none;
      &-item {
        align-items: center;
      }
    }
  }
}`;

const SearchUserWrapper = styled.div`
    .sw-autocomplete-field-popper {
        .sw-autocomplete-field-paper {
            min-height: 10rem;
        }
    }
`;
const RenderSearchUserOptionWrapper = styled.li`
    border-bottom: 1px solid;
    border-color: ${({ theme }) => theme.palette.background.default};
    &[aria-selected="true"] {
        background-color: ${({ theme }) => theme.palette.background.default};
    }
    .rsu-ow {
        &-a {
            flex: 1;
            gap: 0.2rem;
            display: flex;
            padding: 0.5rem;
            align-items: center;
            text-transform: none;
            text-decoration: none;
            color: ${({ theme }) => theme.palette.text.primary};
            &:hover {
                background-color: ${({ theme }) =>
                    theme.palette.background.light};
            }
        }
        &-item {
            flex: 1;
            gap: 0.5rem;
            display: flex;
            &-content {
                flex: 1;
            }
            &-title {
                font-size: 0.9rem;
            }
            &-des {
                font-size: 0.8rem;
                font-style: italic;
                ${ClampedTextStyle(4)}
            }
            &-tag {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                flex-direction: row;
                justify-content: space-between;

                font-size: 0.7rem;
                font-style: italic;
                &-span {
                    margin-left: auto;
                    padding: 0 0.3rem;
                    border-radius: 0.3rem;
                    background-color: ${({ theme }) =>
                        theme.palette.background.default};
                }
            }
        }
    }
`;
export { SearchUserWrapper, SearchUserWrapper2, RenderSearchUserOptionWrapper };
