import { isDev as checkIsDev, checkIsLocal, isTestIp } from "../utils";

const apiPrefix = "api";
const apiVersion = "v2";

const fePort = "3000";
const mainPort = "3008";
const chatPort = "3009";
const alterPort = "3008";
const commonPort = "3007"; // database-service
const partnerPort = "3010";

const prod = {
    fe: "https://skysales.jp",
    main: "http://133.242.50.7",
    alter: "https://api.skysales.jp",
    chat: "https://dev-2-api-chat.skysales.jp",
    common: "https://database.skysales.jp",
    partner: "https://partner.api.skysales.jp",
};

const devIp = "133.242.50.7";
// const devIp = "133.242.228.114";
const devAlterIp = "52.68.1.178";
const testIp = "https://dev-drakos.skysales.jp/";

const dev = {
    fe: "http://" + devIp,
    main: "http://" + devIp,
    chat: "http://" + devIp,
    common: "http://" + devIp,
    partner: "http://" + devIp,
    alter: "http://" + devAlterIp,
};

const testEnv = {
    alter: "http://" + devAlterIp,
    fe: "https://dev-drakos.skysales.jp/",
    chat: "https://chat-drakos.skysales.jp/",
    main: "https://dev-drakos.skysales.jp/db",
    common: "https://dev-drakos.skysales.jp/db",
    partner: "https://dev-drakos.skysales.jp/partner",
};

const local = "http://localhost";
const getDomain = checkIsDev ? devIp : isTestIp ? testIp : ".skysales.jp";
const generateURL = ({
    key = "main",
    apiPrefix: ap,
    apiVersion: av,
    port = mainPort,
    isTest = isTestIp,
    isDev = checkIsDev,
    isLocal = checkIsLocal,
}) => {
    const mainEndpoint = isDev
        ? `${isLocal ? local : dev[key]}:${port}`
        : isTest
        ? testEnv[key]
        : prod[key];
    const urlParts = [mainEndpoint];
    if (ap) urlParts.push(ap);
    if (av) urlParts.push(av);
    return urlParts.join("/");
};

const commonProps = {
    apiPrefix,
    apiVersion,
};
const getEndPoint = (key, props) => {
    console.log({ checkIsLocal, v: import.meta.env.VITE_PUBLIC_HIT_LOCAL_API });
    switch (key) {
        case "fe":
            return generateURL({
                key: "fe",
                port: fePort,
                isLocal: checkIsLocal,
                ...props,
                // isLocal: true,
            });
        case "partner":
            return generateURL({
                key: "partner",
                port: partnerPort,
                ...commonProps,
                isLocal: checkIsLocal,
                ...props,
            });
        case "alter":
            return generateURL({
                apiPrefix,
                apiVersion: "v1",
                key: "alter",
                port: alterPort,
                isLocal: checkIsLocal,
                ...props,
            });
        case "chat":
            return generateURL({
                key: "chat",
                port: chatPort,
                ...commonProps,
                isLocal: checkIsLocal,
                ...props,
            });
        case "common":
            return generateURL({
                key: "common",
                port: commonPort,
                ...commonProps,
                isLocal: checkIsLocal,
                ...props,
            });
        case "main":
        default:
            return generateURL({
                ...commonProps,
                ...props,
                isLocal: checkIsLocal,
                // isLocal: true,
            });
    }
};

export { getDomain, getEndPoint };
