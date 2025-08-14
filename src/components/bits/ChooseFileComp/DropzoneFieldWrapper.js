"use client";
import styled from "@emotion/styled";

const DropzoneFieldWrapper = styled.div`
    .dcw {
        &-label {
            display: block;
            font-size: 0.8rem;
            margin-bottom: 0.1rem;
            &-error {
                color: ${({ theme }) => theme.palette.error.main};
            }
        }
        &-div {
            position: relative;
            overflow: hidden;
            // border: 1px dashed;
            // border-radius: ${({ theme }) => theme.shape.borderRadius}px;
            // border-color: ${({ theme }) => theme.palette.text.disabled};

            // &:focus-within {
            //   border-width: 2px;
            //   border-color: ${({ theme }) => theme.palette.primary.main};
            // }
            &-uploading {
                position: absolute;
                top: 0;
                width: 100%;
                opacity: 0.5;
                height: 0.25rem;
                animation: move-back-forth 1s ease-in-out infinite;
                background-color: ${({ theme }) => theme.palette.primary.main};
            }
        }
        &-helper {
            padding-right: 0.5rem;
        }
    }
`;
export { DropzoneFieldWrapper };
