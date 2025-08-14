import styled from "@emotion/styled";

const EmptyAreaWrapper = styled.div`
    .eaw {
        &-container {
            text-align: center;
            &-h2 {
            }
            &-h3 {
            }
            &-icon {
                max-width: 100%;
                width: ${({ iconWidth }) => iconWidth};
            }
            &-goBack {
                &-btn {
                }
            }
        }
    }
`;

export { EmptyAreaWrapper };
