import { parseJSON } from ".";

// Function to convert an object to URLSearchParams
function objectToParams(obj) {
    const params = new URLSearchParams();

    for (const [k, v] of Object.entries(obj)) {
        const isStringORNumber = typeof v === "number" || typeof v === "string";
        const stringValue = isStringORNumber ? v.toString() : JSON.stringify(v);
        if (v || v === 0) params.append(k, stringValue);
    }

    return params;
}

// Function to convert URL-encoded string to an object
function paramsToObject(urlString) {
    const params = new URLSearchParams(urlString);

    const obj = {};

    for (const [k, v] of params.entries()) {
        obj[k] = parseJSON(v);
    }

    return obj;
}

export { objectToParams, paramsToObject };

// Example usage:
// const inputObject = {
//   key1: 123,
//   key2: 'hello',
//   key3: { nested: 'v' },
// };

// const params = objectToParams(inputObject);
// console.log(params.toString());

// const outputObject = paramsToObject(params.toString());
// console.log(outputObject);
