import he from "he";
import { isUrlRegex, removeHTMLTags } from "./regexHelper";
import Cookies from "js-cookie";
// Capitalize each word in a sentence
const capitalize = (text) =>
    String(text)
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");

// Capitalize first letter
const capitalizeWord = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
// Lowercase first letter
const lowerCaseWord = (string) =>
    string.charAt(0).toLowerCase() + string.slice(1);
// snake_case to camelCase
const snakeToCamel = (string) =>
    string.replace(/([-_]\w)/g, (m) => m[1].toUpperCase());
// camelCase to snake_case
const camelToSnake = (string) =>
    string.replace(/[\w]([A-Z])/g, (m) => m[0] + "_" + m[1]).toLowerCase();
// space case to camelCase
const spaceToCamel = (string) =>
    string.replace(/( \w)/g, (m) => m[1].toUpperCase());
const isJsonParsable = (string) => {
    if (!string) return false;
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
};
const parseJSON = (string) => {
    if (!string) return undefined;
    try {
        return JSON.parse(string);
    } catch (_) {
        return string;
    }
};
const extractFromCookies = (key) => {
    const value = Cookies.get(key);
    if (value) {
        try {
            return JSON.parse(value);
        } catch (error) {
            return value;
        }
    }
    return undefined;
};

const reverseString = (string) => string.split("").reverse().join("");
const elpString = (s, n = 11) =>
    s?.length > n ? s?.slice(0, n - 4) + ".." + s?.slice(-4) : s;

// const replaceLinksInString = (text, replaceFunction) => {
//   return reactStringReplace(
//     text,
//     /<%link%>([\s\S]*?)<\/%link%>/g,
//     replaceFunction
//   );
// };
// capitalize and replace under case with space
const CR = (v) => capitalizeWord(v).replace(/_/g, " ");

const getRandomString = (length = 20) => {
    const randomChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += randomChars.charAt(
            Math.floor(Math.random() * randomChars.length)
        );
    }
    return result;
};

const attachATag = (match) => `<a href='${match}' target='_blank'>${match}</a>`;
const attachATagIfLink = (v) => v?.replace(isUrlRegex, attachATag);

const parseHTMLToString = (v) => he.decode(removeHTMLTags(v));

const getSpecificString = (message, searchedText, contextLength = 20) => {
    const index = message.indexOf(searchedText);
    if (index === -1) return null;

    const start = Math.max(0, index - contextLength);
    const end = Math.min(
        message.length,
        index + searchedText.length + contextLength
    );

    return `${start > 0 ? "..." : ""}${message.slice(start, end)}${
        end < message.length ? "..." : ""
    }`;
};

const stringToArray = (value) => {
    if (typeof value === "string" || value instanceof File) {
        return [value];
    } else {
        return value;
    }
};

const isEmojiOnly = (message, maxEmojis = 5) => {
    // Regular expression to match emojis
    const emojiRegex = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)+$/u;

    // Check if the message consists only of emojis
    if (!emojiRegex.test(message)) {
        return false;
    }

    // Check if the number of emojis is less than the specified limit
    const emojiCount = [...message].length;
    return emojiCount < maxEmojis;
};

export {
    capitalize,
    capitalizeWord,
    lowerCaseWord,
    snakeToCamel,
    camelToSnake,
    spaceToCamel,
    isJsonParsable,
    extractFromCookies,
    reverseString,
    elpString,
    // replaceLinksInString,
    CR,
    parseJSON,
    getRandomString,
    attachATagIfLink,
    parseHTMLToString,
    getSpecificString,
    stringToArray,
    isEmojiOnly,
};
