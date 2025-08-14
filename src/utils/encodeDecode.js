import { isJsonParsable } from "./stringHelpers";

const encodeToBase64 = (data, stringify = false) => {
    const processedData = stringify ? JSON.stringify(data) : data;

    if (typeof processedData !== "string") {
        throw new Error(
            "Data must be a string or serializable object when encoding to Base64."
        );
    }

    const bytes = new TextEncoder().encode(processedData);
    return btoa(String.fromCharCode(...bytes));
};

const decodeFromBase64 = (encodedData, parse = false) => {
    try {
        const binaryString = atob(encodedData);
        const bytes = Uint8Array.from(binaryString, (char) =>
            char.charCodeAt(0)
        );
        const decodedData = new TextDecoder().decode(bytes);

        if (parse && isJsonParsable(decodedData)) {
            return JSON.parse(decodedData);
        }

        return decodedData;
    } catch (error) {
        console.error("Error decoding Base64:", error);
        return null;
    }
};

export { encodeToBase64, decodeFromBase64 };
