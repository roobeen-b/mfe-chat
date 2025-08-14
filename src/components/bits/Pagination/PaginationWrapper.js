import styled from "@emotion/styled";
import { breakpoint } from "@styles/mui/theme";

const PaginationWrapper = styled.div`
    gap: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    margin-top: 1rem;
    align-items: center;
    justify-content: ${({ setPerPage }) =>
        setPerPage ? "space-between" : "center"};
    .pw {
        &-pagination {
            display: flex;
            justify-content: center;
        }
    }
    ${breakpoint("ssm")} {
        justify-content: center;
    }
`;

const PaginationPerPageWrapper = styled.div`
    gap: 0.5rem;
    display: flex;
    align-items: center;
    .pp_pw {
        &-select {
            .MuiSelect-select {
                font-size: 0.9rem;
                padding: 0.2rem 0.8rem 0.2rem 0.5rem;
            }
            .MuiSelect-icon {
                right: -0.1rem;
                font-size: 1rem;
            }
            ${breakpoint("sm")} {
                .MuiSelect-icon {
                    top: 1px;
                    right: 0px;
                }
            }
        }
        &-label {
            font-size: 0.9rem;
        }
    }
`;

export { PaginationWrapper, PaginationPerPageWrapper };
