import styled from "@emotion/styled";

import { breakpoint } from "@styles/mui/theme";
import { MAX_WIDTH } from "@styles/mui/constant";

export const MainContentWrapper = styled.div`
    margin: auto;
    padding: 1rem;
    max-width: var(--max-screen-width);

    // height: calc(100% - var(--footer-height));
    ${breakpoint("ssm")} {
        padding: 0.5rem;
    }
    ${breakpoint("xxs")} {
        padding: 0;
    }
`;
export const LocaleLayoutWrapper = styled.div`
    --header-height: 72px;
    --footer-height: 40px;
    --header-height-sl: 60px;

    --max-screen-width: ${MAX_WIDTH};

    --main-sidebar-width: 300px;
    --main-sidebar-width-md: 250px;

    width: 100%;
    // height: calc(100% - var(--header-height));
    background-color: ${({ theme }) => theme.palette?.background.light};
`;
