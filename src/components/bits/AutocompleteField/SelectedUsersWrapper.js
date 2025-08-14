import styled from "@emotion/styled";
import { ClampedTextStyle, CScrollbarStyle2 } from "@styles/mui/utilsStyle";

export const SelectedUsersWrapper = styled.div`
    top: 40px; // height of search
    width: 100%;
    height: 80px;
    position: absolute;
    .suw {
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

            ${CScrollbarStyle2}
            &-item {
                gap: 0.3rem;
                display: flex;
                align-items: center;
                padding: 0.5rem 0.3rem;
                background-color: ${({ theme }) =>
                    theme?.palette.primary.light};

                &-name {
                    max-width: 100px;
                    text-align: center;
                    ${ClampedTextStyle(1)}
                    line-height: 1;
                }
                &-close {
                    font-size: 1rem;
                    cursor: pointer;
                }
            }
        }
    }
`;
