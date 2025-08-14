const regexHTMLTags = /<[^>]*>/g;
export const removeHTMLTags = (text) => {
    return typeof text === "string" ? text.replace(regexHTMLTags, "") : text;
};
const regexSpaceRemove = /\s/g;
export const getStringFromUri = (text) => {
    const temp = text.slice(text.lastIndexOf("/") + 1);
    const temp2 = decodeURI(temp.slice(temp.indexOf("-") + 1));
    return temp2.replace(regexSpaceRemove, "-");
};

// /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/;
export const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/;
export const upperCaseRegex = /^(?=.*[A-Z])/;
export const lowerCaseRegex = /^(?=.*[a-z])/;
export const oneNumberRegex = /^(?=.*\d)/;
export const oneSymbolRegex = /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])/;
export const isLinkRegex =
    /(?:https?|ftp):\/\/[\w-]+(\.[\w-]+)+(?:[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g;
export const isUrlRegex =
    /^(?:https?|ftp):\/\/[\w.-]+(?:\.[\w-]+)+[\w._~:/?#[\]@!$&'()*+,;=]+/gim;
// /^(?:https?|ftp):\/\/[\w.-]+(?:\.[\w-]+)+[\w-._~:/?#[\]@!\$&'()*+,;=]+/gim;

// 3000 - 303f: Japanese-style punctuation
// 3040 - 309f: Hiragana
// 30a0 - 30ff: Katakana
// ff00 - ff9f: Full-width Roman characters and half-width Katakana
// 4e00 - 9faf: CJK unified ideographs - Common and uncommon Kanji
// 3400 - 4dbf: CJK unified ideographs Extension A - Rare Kanji
//http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
export const halfWidthKatakanaRange = /^[\uFF61-\uFF9F]+$/g;
export const kanji = /[一-龯]/g;
export const regexIsKanji = /^[[\u4e00-\u9faf]|[\u3400-\u4dbf]]+$/g;
export const regexIsKana = /^[\u30a0-\u30ff ]+$/g;

export const isEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const isPhoneRegex = /^\d{10}$/;
export const isPhoneWithCodeRegex = /^\+?\d{10,15}$/;
export const isNumberRegex = /^-?\d+(\.\d+)?$/;
export const isIntegerRegex = /^\d+$/;
export const isJapanesePhoneNumberRegex =
    /^(?:\+81[-\s]?|0)(\d{1,4})-?\d{1,4}-?\d{4}$/;

export const removeLeadingZeros = (value = "") => {
    return String(value).replace(/^0+(?=\d)/, "");
};
