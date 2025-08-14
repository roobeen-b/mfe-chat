"use client";

import { useEffect, useState } from "react";

/**  Latitude & Longitude Boundaries for Nepal */
const LAT_EXTEND_NEPAL = [26.35, 30.45];
const LONG_EXTEND_NEPAL = [80.06, 88.2];

const GEOLOCATION_OPTIONS = {
    timeout: 5000,
    maximumAge: 0,
    enableHighAccuracy: true,
};

export const useGetCurrentLocation = () => {
    const [coords, setCoords] =
        (useState < GeolocationCoordinates) | (null > null);
    const [isCurrLocationNep, setIsCurrLocationNep] =
        useState < boolean > false;

    const success = (position) => {
        const { latitude, longitude } = position.coords;
        setCoords(position.coords);

        const isCurrInNepal =
            LAT_EXTEND_NEPAL[0] <= latitude &&
            latitude <= LAT_EXTEND_NEPAL[1] &&
            LONG_EXTEND_NEPAL[0] <= longitude &&
            longitude <= LONG_EXTEND_NEPAL[1];

        setIsCurrLocationNep(isCurrInNepal);
    };

    const handleError = (error) => {
        console.warn(`Geolocation Error (${error.code}): ${error.message}`);
    };

    useEffect(() => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            return;
        }

        navigator.permissions.query({ name: "geolocation" }).then((result) => {
            if (result.state === "granted" || result.state === "prompt") {
                navigator.geolocation.getCurrentPosition(
                    success,
                    handleError,
                    GEOLOCATION_OPTIONS
                );
            }
        });
    }, []);

    return { coords, isCurrLocationNep };
};
