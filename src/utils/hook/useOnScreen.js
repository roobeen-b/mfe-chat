import { useEffect, useState } from "react";

/**
 * Custom hook to determine if a given element is currently visible on the screen.
 *
 * @param {RefObject<Element>} ref - The React Ref object of the element to observe.
 * @param {string} [rootMargin="0px"] - Margin around the root (the browser viewport), given as a CSS string.
 * @returns {boolean} A boolean indicating whether the observed element is intersecting with the viewport.
 */
export const useOnScreen = (ref, rootMargin = "0px") => {
    // State and setter for storing whether the element is visible
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        // Create an IntersectionObserver to watch for changes in visibility
        const observer = new IntersectionObserver(
            ([entry]) => {
                // Update our state when the observer callback fires
                setIntersecting(entry.isIntersecting);
            },
            { rootMargin }
        );

        // Start observing the target element if it exists
        const { current: currentElement } = ref;
        if (currentElement) observer.observe(currentElement);

        // Clean up the observer when the component unmounts or the target element changes
        return () => {
            if (currentElement) observer.unobserve(currentElement);
        };
    }, [ref, rootMargin]); // Dependencies: ref and rootMargin

    return isIntersecting;
};
