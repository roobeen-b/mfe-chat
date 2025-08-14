import Cookies from "js-cookie";
import { encodeToBase64 } from "./encodeDecode";
// import { getDomain } from "../api/endpoint";

// **************************** Local Storage *****************************
export const getItemLocal = (n) => localStorage.getItem(n);
export const removeItemLocal = (n) => localStorage.removeItem(n);
export const setItemLocal = (n, v) => localStorage.setItem(n, v);

export const getLocalStorage = (key) => {
    const localKey = encodeToBase64("partner-dash");
    const encodedKey = encodeToBase64(key);
    const storedData = JSON.parse(localStorage?.getItem?.(localKey) || "{}");
    return storedData[encodedKey];
};
export const updateLocalStorage = (key, value, action = "set") => {
    const localKey = encodeToBase64("partner-dash");
    const encodedKey = encodeToBase64(key);
    const storedData = JSON.parse(localStorage?.getItem?.(localKey) || "{}");
    if (action === "remove") delete storedData[encodedKey];
    if (action === "set") storedData[encodedKey] = value;
    localStorage?.setItem?.(localKey, JSON.stringify(storedData));
};

// **************************** Session Storage ****************************
export const getItem = (n) => sessionStorage.getItem(n);
export const removeItem = (n) => sessionStorage.removeItem(n);
export const setItem = (n, v) => sessionStorage.setItem(n, v);

// **************************** Cookies ************************************
// export const setCookie = (n, v) =>
//     Cookies.set(n, v, {
//         expires: 90,
//         SameSite: "Lax",
//         domain: window?.location?.origin?.includes("localhost")
//             ? "localhost"
//             : getDomain,
//     });
export const getCookie = (n) => Cookies.get(n);
// export const removeCookie = (n) =>
//     Cookies.remove(n, {
//         SameSite: "Lax",
//         domain: window?.location?.origin?.includes("localhost")
//             ? "localhost"
//             : getDomain,
//     });
