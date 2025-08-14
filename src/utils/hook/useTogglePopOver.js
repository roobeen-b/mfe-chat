import { useState } from "react";

export const useTogglePopOver = () => {
    const [isPopOverOpen, setIsPopOverOpen] = useState(false);

    const handleTogglePopOver = () => {
        setIsPopOverOpen((prev) => !prev);
    };

    const openPopOver = () => setIsPopOverOpen(true);
    const closePopOver = () => setIsPopOverOpen(false);

    return {
        openPopOver,
        closePopOver,
        isPopOverOpen,
        handleTogglePopOver,
    };
};
