import styled from "@emotion/styled";

export const VerticalTabsWrapper = styled.div`
    width: 100%;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .vertical-tw {
        &-icon {
            border: 1px solid ${({ theme }) => theme.palette.grey[200]};
            border-radius: 5px;

            &:hover {
                color: ${({ theme }) => theme.palette.common.white};
                background-color: ${({ theme }) => theme.palette.primary.main};
            }
        }

        &-button {
            display: flex;
            justify-content: left;
            color: ${({ theme }) => theme.palette.grey[800]};
            border: 1px solid ${({ theme }) => theme.palette.grey[200]};

            &-label {
                text-align: left;
                font-size: 0.9rem;
                font-weight: 500;
            }
        }

        &-active {
            color: ${({ theme }) => theme.palette.common.white};
            background-color: ${({ theme }) => theme.palette.primary.main};
        }
    }
`;
