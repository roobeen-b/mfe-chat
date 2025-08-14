import { useIntl } from "react-intl";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";

import { getTheme } from "../../../styles/mui/theme";
import { GlobalStyleWrapper } from "../../../styles/mui/globalStyle";

export const ClientThemeProvider = ({ locale, children, className }) => {
    const intl = useIntl();
    const l = intl.locale;

    const cusTheme = getTheme({ lang: l || locale });

    return (
        <ThemeProvider theme={cusTheme}>
            <CssBaseline />
            <GlobalStyleWrapper className={className}>
                {children}
            </GlobalStyleWrapper>
        </ThemeProvider>
    );
};
