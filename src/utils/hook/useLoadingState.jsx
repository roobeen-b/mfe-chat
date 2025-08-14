"use client";
import { useState, useCallback } from "react";

export const useLoadingState = () => {
    const [isLoading, setIsLoading] = useState(false);

    const loadWithDelay = useCallback((seconds) => {
        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, seconds * 1000);

        return () => clearTimeout(timeoutId); // Cleanup function
    }, []);

    return { isLoading, loadWithDelay };
};
