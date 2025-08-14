"use client";
import { jaJP, enUS } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";

import { BREAKPOINTS } from "./constant";
import { darkPalette, lightPalette } from "./palette";

const cusTheme = {
    dir: "ltr",
    direction: "ltr",
    palette: lightPalette,
    typography: {
        fontFamily: ["Roboto", '"Helvetica Neue"', "sans-serif"].join(","),
        button: {
            textTransform: "capitalize",
        },
        h5: {
            fontWeight: "600",
        },
        h6: {
            fontWeight: "600",
        },
    },
    components: {
        MuiDivider: {
            styleOverrides: {
                root: { height: "3px" },
            },
        },
        MuiButton: {
            styleOverrides: {},
        },
    },
};

const getTheme = ({ rtl = false, darkTheme = false, lang = "ja" }) => {
    const palette = darkTheme ? darkPalette : lightPalette;
    const styles = {
        ...cusTheme,
        palette,
        dir: rtl ? "rtl" : "ltr",
        direction: rtl ? "rtl" : "ltr",
    };
    return createTheme({ ...styles }, lang === "ja" ? jaJP : enUS);
};

export const breakpoint = (size, hw = "width", pos = "max") =>
    `@media (${pos}-${hw}: ${BREAKPOINTS[hw][size]})`;

export { cusTheme, getTheme };
