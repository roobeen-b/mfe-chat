// "use client";
// import { useEffect, useRef } from "react";

// /**
//  * Custom React hook for handling intervals with dependencies.
//  * @param callback The function to be executed at each interval.
//  * @param delay The interval delay in milliseconds. Pass `null` to stop the interval.
//  * @param deps The dependencies to watch for changes.
//  */
// export const useInterval = (
//   callback: () => void,
//   delay: number | null,
//   deps: any[] = []
// ) => {
//   const savedCallback = useRef<() => void>();

//   // Remember the latest callback
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval
//   useEffect(() => {
//     function tick() {
//       if (savedCallback.current) {
//         savedCallback.current();
//       }
//     }

//     if (delay !== null) {
//       const intervalId = setInterval(tick, delay);
//       return () => clearInterval(intervalId);
//     }
//   }, [...deps, delay]);
// };

import { useEffect, useRef } from "react";

/**
 * Custom React hook for handling intervals with dependencies.
 * @param callback The function to be executed at each interval.
 * @param delay The interval delay in milliseconds. Pass `null` to stop the interval.
 * @param deps The dependencies to watch for changes.
 */
export const useInterval = (callback, delay, deps = []) => {
    const savedCallback = useRef(null);

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        function tick() {
            savedCallback.current?.();
        }

        if (delay !== null) {
            const intervalId = setInterval(tick, delay);
            return () => clearInterval(intervalId);
        }
    }, [delay, ...deps]);
};
