import { useEffect, useRef } from "react";

export const useClickOutside = (callback) => {
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log("useClickOutside handleClickOutside");
            // Check if ref is defined and that the target is not within the ref
            if (ref.current && !ref.current.contains(event?.target)) {
                callback();
            }
        };

        // Use passive option for performance improvement
        const options = { capture: true, passive: true };
        document.addEventListener("click", handleClickOutside, options);

        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener("click", handleClickOutside, options);
        };
    }, [callback]); // Include callback in dependencies

    return ref;
};
