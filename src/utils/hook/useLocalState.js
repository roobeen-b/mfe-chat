"use client";
import { useEffect, useState } from "react";
import { getLocalStorage, updateLocalStorage } from "..";

export const useLocalState = (name, val) => {
    const [local, setLocal] = useState(getLocalStorage(name) || val);

    useEffect(() => {
        const val = getLocalStorage(name);
        setLocal(val);
    }, []);

    const onLocalChange = (val) => {
        setLocal(val);
        updateLocalStorage(name, val);
    };

    return [local || val, onLocalChange];
};
