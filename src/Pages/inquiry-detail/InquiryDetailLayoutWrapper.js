import styled from "@emotion/styled";
import { breakpoint } from "@styles/mui/theme";

export const InquiryDetailLayoutWrapper = styled.div`
    width: 100%;
    height: 100%;

    .hw-left-sidebar {
        display: flex !important;
    }

    .idl-w-main {
        position: relative;
        z-index: 0;
        padding: 0;

        &-flex {
            display: flex;
            &-left {
                position: sticky;
                top: var(--header-height);
                ${breakpoint("sm")} {
                    display: none;
                }
            }
            &-right {
                flex: 1;
                max-width: 100%;
                // min-height: calc(
                //   100vh - var(--header-height) - var(--footer-height) - 18px
                // );
                min-height: calc(100vh - var(--header-height) - 18px);
            }
        }
    }
`;
