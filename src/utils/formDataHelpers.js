const DefaultFileFieldNames = ["images", "attachments", "files", "csvFile"];
const parseObjToFormData = async (
    obj,
    fileFieldNames = DefaultFileFieldNames
) => {
    const formData = new FormData();
    Object.entries(obj).forEach((i) => {
        if (fileFieldNames.includes(i[0])) {
            if (Array.isArray(i[1])) {
                i[1]?.forEach((j) => {
                    formData.append(i[0], j, encodeURIComponent(j?.name || ""));
                });
            } else
                formData.append(
                    i[0],
                    i[1],
                    encodeURIComponent(i[1]?.name || "")
                );
        } else if (Array.isArray(i[1]) || i[1]?.constructor === Object)
            formData.append(i[0], JSON.stringify(i[1]));
        else formData.append(i[0], i[1]);
    });
    // if (process.env.NEXT_PUBLIC_ENV === "development")
    //     consoleFormData(formData);
    return formData;
};

const consoleFormData = (formData) => {
    console.info(`----form-data-console-start----`);
    for (const [k, v] of formData.entries()) {
        console.info(`${k}=>${v}`);
    }
    console.info(`-----form-data-console-end-----`);
};

const compareValues = async (n, i) => {
    if (n.constructor !== Object || i.constructor !== Object) return n;
    else {
        const t = {};
        Object.keys(n).forEach((k) => {
            if (JSON.stringify(n[k]) !== JSON.stringify(i[k])) {
                t[k] = n[k];
            }
        });
        return t;
    }
};

export { parseObjToFormData, consoleFormData, compareValues };
