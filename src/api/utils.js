import { getEndPoint } from "./endpoint";
import { getLang } from "../translations/utils/getLang";
import { parseJSON, SnackBar } from "../utils";

const parseErrFunc = (err, defaultMsg) => {
    const parsedError = parseJSON(err?.message);
    const message =
        typeof parsedError === "string"
            ? parsedError
            : parsedError?.message || parsedError?.error || defaultMsg;
    return { parsedError, message };
};

const getSpecificFromError = (err, key) => {
    const parsedError = parseJSON(err?.message);

    // Ensure parsedError is an object before indexing
    if (typeof parsedError === "string") {
        return parsedError;
    } else if (parsedError && typeof parsedError === "object") {
        return parsedError[key];
    }

    return undefined;
};

const handleDefaultError = (msg, handleError) => (err) => {
    console.error({ handleDefaultError: err });
    const { message, parsedError } = parseErrFunc(err, msg);
    SnackBar({ message, doNotTranslate: Boolean(parsedError) }, "error");

    if (handleError) handleError(err, msg);
};

const MainSiteLink = (u = "") => {
    const lang = getLang();
    const siteLink = getEndPoint("partner");
    return `${siteLink}/${lang}/${u}`;
};

export { parseErrFunc, handleDefaultError, MainSiteLink, getSpecificFromError };
