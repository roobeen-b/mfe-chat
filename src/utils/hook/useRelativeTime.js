"use client";
import { useEffect, useState } from "react";
import { getRelativeTime, useInterval } from "..";

/**
 * Custom React hook to calculate and update relative time based on a provided initial date.
 * @param dateString The initial date for calculating relative time.
 * @returns The calculated relative time string.
 */
export const useRelativeTime = (dateString, options) => {
    const [relativeTime, setRelativeTime] = useState("");

    //   Update the relative time based on the current date
    const updateRelativeTime = () => {
        setRelativeTime(getRelativeTime(dateString, undefined, options));
    };

    // Update the relative time on initial mount
    useEffect(() => updateRelativeTime(), []);
    // Update the relative time at intervals
    useInterval(() => updateRelativeTime(), 10000, [dateString]);

    return relativeTime;
};
