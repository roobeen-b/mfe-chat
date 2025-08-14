import styled from "@emotion/styled";

const ViewFiles2Wrapper = styled.div`
    .dfi {
        position: relative;
        width: 100%;
        height: 100%;

        &:hover {
            .dfi-a {
                &-file {
                    opacity: 0.3;
                }
            }
            .rounded {
                opacity: 0.3;
            }
            .dfi-icon {
                opacity: 1;
            }
        }

        &-a {
            &-file {
                width: 100%;
                height: 100%;
                object-fit: contain;
                border: 1px solid;
                transition: 0.2s ease-in-out all;
            }

            .rounded {
                object-fit: cover;
                border-radius: 50%;
                transition: 0.2s ease-in-out all;
            }
        }
        &-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            height: unset;
            width: unset;
            bottom: unset;
            cursor: pointer;
            opacity: 0;
            transform: translate(-50%, -50%);
            transition: 0.2s ease-in-out all;
            background-color: red;
            border-radius: 50%;
            height: 30px;
            width: 30px;
            padding: 5px;

            &-remove {
                height: 20px;
                width: 20px;
                fill: #ffffff;
                stroke: #ffffff;
                stroke-width: 0.8px;
            }
        }
    }
`;

export { ViewFiles2Wrapper };
