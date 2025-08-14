import styled from "@emotion/styled";
import { ScrollbarStyle } from "./utilsStyle";

const GlobalStyleWrapper = styled.div`
    width: 100%;
    height: 100vh;
    .main {
        &-div {
            width: 100%;
            height: 100%;
            &-children {
                width: 100%;
                height: 100%;
            }
        }
    }
    .my-toast[data-sonner-toast] button[data-close-button] {
        right: 0;
        left: unset;
        transform: translate(35%, -35%);
    }

    [data-sonner-toaster][data-sonner-theme="light"] {
        --normal-bg: var(--background);
        --normal-border: var(--background-start-rgb);
        --normal-text: #3d4548; /* Matches light palette text.primary */

        --success-bg: var(--success-light);
        --success-border: var(--success-medium);
        --success-text: #ffffff; /* Color code for success text */

        --info-bg: var(--info-light);
        --info-border: var(--info-medium);
        --info-text: #ffffff; /* Color code for info text */

        --warning-bg: var(--warning-light);
        --warning-border: var(--warning-medium);
        --warning-text: #ffffff; /* Color code for warning text */

        --error-bg: var(--error-light);
        --error-border: var(--error-medium);
        --error-text: #ffffff; /* Color code for error text */
    }

    // .locale-layout {
    //   width: 100%;
    //   height: 100%;
    // }
    // ${ScrollbarStyle}
`;
export { GlobalStyleWrapper };
