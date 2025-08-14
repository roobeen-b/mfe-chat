import { useState } from "react";

export const useTabState = ({ val }) => {
    const [accTab, setAccTab] = useState(val);

    const onTabChange = (t) => {
        setAccTab(t);
    };

    return {
        onTabChange,
        activeTab: accTab || val,
    };
};
