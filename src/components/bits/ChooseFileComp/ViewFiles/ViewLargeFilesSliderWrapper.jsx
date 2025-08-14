import styled from "@emotion/styled";

const ViewLargeFilesSliderWrapper = styled.div`
    .vlf-sw {
    }
`;
const ViewLargeFilesSliderContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    .vlf-sw-modal-content {
        &-swiper {
            width: 100%;
            height: 100%;
            &-item {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                &-file {
                    gap: 1rem;
                    width: 250px;
                    height: 250px;
                    display: flex;
                    padding: 1rem;
                    align-items: center;
                    flex-direction: column;
                    justify-content: center;
                    border-radius: ${({ theme }) =>
                        theme?.shape.borderRadius}px;
                    &-title {
                        color: ${({ theme }) => theme?.palette.common.white};
                    }
                    &-button {
                        text-align: center;
                    }
                }
            }
        }
    }
`;

export { ViewLargeFilesSliderWrapper, ViewLargeFilesSliderContentWrapper };
