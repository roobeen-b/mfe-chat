import styled from "@emotion/styled";
import { ClampedTextStyle } from "@styles/mui/utilsStyle";

export const InfoGeneratedFromLinkCardWrapper = styled.div`
    width: 100%;
    cursor: pointer;
    max-width: 250px;
    overflow: hidden;
    margin-top: 0.25rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #d1d5db;

    .igf-lcw {
        &-img-container {
            width: 100%;
            height: 24rem;
            overflow: hidden;
            max-height: 24rem;
            text-align: center;
            &-small {
                height: 8rem;
                max-height: 8rem;
            }
            &-img {
                width: 100%;
                height: 100%;
                padding: 0.5rem;
                object-fit: contain;
                background-color: #e5e7eb;
            }
        }
        &-content {
            padding: 0.5rem;
            text-align: left;
            color: ${({ theme }) => theme.palette.text.secondary};
            background-color: ${({ theme }) =>
                theme.palette.background.default};
            &-site {
                font-size: 1.25rem;
                &-small {
                    font-size: 1rem;
                }
            }
            &-title {
                font-size: 1rem;
                font-weight: 600;
                ${ClampedTextStyle(2)}
                &-small {
                    font-size: 0.85rem;
                }
            }
            &-desc {
                ${ClampedTextStyle(2)}
                &-small {
                    line-height: 1rem;
                    font-size: 0.75rem;
                }
            }
        }
    }
`;
