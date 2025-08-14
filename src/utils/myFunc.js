const removeNull = (val) => {
    if (val == null) return undefined;
    if (Array.isArray(val)) {
        if (val.length === 0) return [];
        for (let i = 0; i < val.length; i++) val[i] = removeNull(val[i]);
    }
    if (val?.constructor === Object) {
        Object.entries(val).forEach(([k, v]) => (val[k] = removeNull(v)));
    }
    return val;
};

const isDev = import.meta.env.VITE_PUBLIC_ENV === "development";
const isProd = import.meta.env.VITE_PUBLIC_ENV === "production";
const isTestIp = import.meta.env.VITE_PUBLIC_ENV === "testing";
const checkIsLocal = import.meta.env.VITE_PUBLIC_HIT_LOCAL_API === "true";

const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
};

const findArrayChanges = (initialArray, modifiedArray) => {
    const addedArray = [];
    const editedArray = [];
    const deletedArray = [];

    // Create a set of IDs for initial and modified arrays
    const initialIds = new Set(initialArray.map((obj) => obj.id));
    const modifiedIds = new Set(modifiedArray.map((obj) => obj.id));

    // Iterate over the modifiedArray to find added and edited objects
    modifiedArray.forEach((obj) => {
        // If the object has no ID or its ID is not present in the initialIds set,
        // it's a newly added object.
        if (!obj.id || !initialIds.has(obj.id)) {
            addedArray.push(obj);
        } else if (initialIds.has(obj.id) && modifiedIds.has(obj.id)) {
            // If the object's ID is present in both the initial and modified arrays,
            // it's an edited object.
            editedArray.push(obj);
        }
    });

    // Iterate over the initialArray to find deleted objects
    initialArray.forEach((obj) => {
        // If the object's ID is not present in the modifiedIds set, it was deleted
        // in the modifiedArray.
        if (!modifiedIds.has(obj.id)) {
            deletedArray.push(obj);
        }
    });

    return { addedArray, editedArray, deletedArray };
};

const findArrayChanges2 = (initialArray = [], modifiedArray = []) => {
    let addedArray = [];
    let editedArray = [];
    let deletedArray = [];
    let toBeEditedArray = [];

    const A = initialArray?.length;
    const B = modifiedArray?.length;

    if (A === B) {
        toBeEditedArray = modifiedArray;
    }
    if (B > A) {
        addedArray = modifiedArray.slice(A);
        toBeEditedArray = modifiedArray.slice(0, A);
    }
    if (A > B) {
        deletedArray = initialArray.slice(B);
        toBeEditedArray = modifiedArray.slice(0, B);
    }

    if (toBeEditedArray.length > 0) {
        editedArray = toBeEditedArray.map((i, j) => ({
            ...i,
            id: initialArray[j].id,
        }));
    }

    return { addedArray, editedArray, deletedArray };
};

const isNullUndefined = (v) =>
    [null, "null", undefined, "undefined"].includes(v);

function waitMinutes(milliseconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
}

function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    return arr1.every((item, index) => item === arr2[index]);
}

function findChangedValString(oldVal, newVal) {
    const changedVal = {};
    // Iterate through keys of newVal
    for (const key in newVal) {
        if (Object.prototype.hasOwnProperty.call(newVal, key)) {
            const o = oldVal?.[key];
            const n = newVal[key];

            // Check if the new value is not undefined and not the same as oldVal
            if (Array.isArray(o) && Array.isArray(n)) {
                if (!arraysAreEqual(o, n)) {
                    changedVal[key] = n;
                }
            } else if (n !== undefined && n !== o) {
                changedVal[key] = n;
            }
        }
    }
    return changedVal;
}

const generateRandomNumber = (min = 0, max = 100) => {
    return Math.floor(Math.random() * (Math.abs(max - min) + 1)) + min;
};

const removeEmptyValues = (obj, options) => {
    const defaultOptions = {
        null: true,
        undefined: true,
        emptyString: true,
    };
    const mergedOptions = { ...defaultOptions, ...options };

    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => {
            const isEmpty =
                (mergedOptions.null && value === null) ||
                (mergedOptions.emptyString && value === "") ||
                (mergedOptions.undefined && value === undefined);
            return !isEmpty;
        })
    );
};

const numberInputOnWheelPreventChange = (e) => {
    const target = e.target;

    // Ensure it's a number input before applying changes
    if (target.tagName === "INPUT" && target.type === "number") {
        target.blur();
        e.stopPropagation();

        // Refocus immediately after the event execution
        setTimeout(() => target.focus(), 0);
    }
};

const queryParams = (params, url) => {
    const href = url || "";
    const reg = new RegExp("[?&]" + params + "=([^&#]*)", "i");
    const queryString = reg.exec(href);
    return queryString ? queryString[1] : null;
};

export {
    isDev,
    isProd,
    isTestIp,
    checkIsLocal,
    removeNull,
    queryParams,
    waitMinutes,
    getKeyByValue,
    isNullUndefined,
    findArrayChanges,
    findArrayChanges2,
    removeEmptyValues,
    findChangedValString,
    generateRandomNumber,
    numberInputOnWheelPreventChange,
};
