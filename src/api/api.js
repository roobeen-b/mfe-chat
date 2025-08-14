import { getLang } from "../translations/utils/getLang";
import { checkIsLocal, extractFromCookies } from "../utils";
import { getEndPoint } from "./endpoint";

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorMessage = await response.text();
        console.error({ handleResponse: errorMessage });
        throw new Error(errorMessage);
    }

    return await response.json();
};
const createRequest = async (url, method, options = {}) => {
    try {
        const { arg } = options;
        const {
            data,
            headers,
            formData,
            isAuth = true,
            endpoint = "main",
            isLocal = checkIsLocal,
            ...rest
        } = arg || {};

        const lang = getLang();
        const authToken = extractFromCookies("chat_token");
        const requestHeaders = new Headers({ ...headers });

        const link = getEndPoint(endpoint, { isLocal }) + `/${lang}${url}`;
        // const link2 = getEndPoint("alter") + `/${lang}${url}`;

        if (isAuth && authToken) {
            requestHeaders.set("Authorization", `Bearer ${authToken}`);
        }
        if (data && !requestHeaders.has("Content-Type")) {
            requestHeaders.set("Content-Type", "application/json");
        }

        // const alterFetch = () => {
        //   try {
        //     fetch(link2, {
        //       method,
        //       headers: requestHeaders,
        //       body: formData ? formData : JSON.stringify(data),
        //       ...rest,
        //     });
        //   } catch (error) {}
        // };
        // alterFetch();
        const response = await fetch(link, {
            method,
            headers: requestHeaders,
            body: formData ? formData : JSON.stringify(data),
            ...rest,
        });

        return await handleResponse(response);
    } catch (error) {
        console.error({ [`createRequest_${url}_error`]: error });
        throw error;
    }
};

const GetApi = (url, options) => createRequest(url, "GET", options);

const PostApi = (url, options) => createRequest(url, "POST", options);

const PatchApi = (url, options) => createRequest(url, "PATCH", options);

const DeleteApi = (url, options) => createRequest(url, "DELETE", options);

export { GetApi, PostApi, PatchApi, DeleteApi };
