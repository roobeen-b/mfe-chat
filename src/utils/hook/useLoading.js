"use client";
import { useState, useCallback } from "react";

export const useLoading = (defaultDuration = 2000) => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = useCallback(
        (duration = defaultDuration, callback = () => {}) => {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                callback(); // Execute the callback after loading finishes
            }, duration);
        },
        [defaultDuration]
    );

    return { isLoading, startLoading };
};
