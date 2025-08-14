import styled from "@emotion/styled";
import { breakpoint } from "@styles/mui/theme";

const ScrollbarStyle = `&::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
&::-webkit-scrollbar-thumb {
  background-color: var(--primary);
}
&::-webkit-scrollbar-track {
  background-color: lightgrey;
}
&::-webkit-scrollbar-thumb:hover {
  background-color: var(--primary-light);
}`;

const ModalWrapper = styled.div`
    width: 100%;
    padding: 2rem;
    display: flex;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 0.5rem;
    flex-direction: column;
    box-shadow: ${({ theme }) => theme?.shadows[5]};
    background-color: ${({ theme }) => theme?.palette.background.paper};
    max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}px` : "500px")};

    // Center the modal in the viewport
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);

    ${breakpoint("ssm")} {
        padding: 1rem;
        max-width: 100%;
        border-radius: 0; // Full-screen effect on mobile devices
    }

    ${ScrollbarStyle};
    .mw {
        &-close {
            top: 1rem;
            right: 1rem;
            position: absolute;
        }
    }
`;

const ModalContentScrollbarHackStyle = `
overflow-y: auto;
padding: 0 2rem;
margin-left: -2rem;
margin-right: -2rem;
${ScrollbarStyle};
${breakpoint("ssm")} {
padding: 0 1rem;
margin-left: -1rem;
margin-right: -1rem;
}
${breakpoint("xl", "height")} {
overflow-y: unset;
}
`;

export { ModalWrapper, ModalContentScrollbarHackStyle };
