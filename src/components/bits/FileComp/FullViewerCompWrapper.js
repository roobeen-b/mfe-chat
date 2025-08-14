"use client";

import styled from "@emotion/styled";
import { breakpoint } from "@styles/mui/theme";

const FullPdfViewerCompWrapper = styled.div`
    width: 90%;
    .pvw {
        &-alert {
            background-color: ${({ theme }) => theme.palette.primary.light};
        }
        &-pdf {
            width: 100%;
            overflow: hidden;
            height: calc(100vh - 100px);
        }
    }
    ${breakpoint("sm")} {
        width: 100%;
    }
`;

const FulDocViewerCompWrapper = styled.div`
    width: 90%;
    .dvw {
        &-alert {
            background-color: ${({ theme }) => theme.palette.primary.light};
        }
        &-doc {
            width: 100%;
            overflow: hidden;
            height: calc(100vh - 200px);
        }
    }
    ${breakpoint("sm")} {
        width: 100%;
    }
`;

export { FullPdfViewerCompWrapper, FulDocViewerCompWrapper };
