import { useState } from "react";
import { useInterval } from "./useInterval";

export const useCountdownTimer = (onTimerEnd) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [delay, setDelay] = (useState < number) | (null > null);

    const resetTimer = (min = 0, sec = 59, del = 1000) => {
        setMinutes(min);
        setSeconds(sec);
        setDelay(del);
    };

    useInterval(() => {
        if (seconds > 0) {
            setSeconds((prev) => prev - 1);
        } else {
            if (minutes > 0) {
                setMinutes((prev) => prev - 1);
                setSeconds(59);
            } else {
                onTimerEnd();
                setDelay(null);
            }
        }
    }, delay);

    return { minutes, seconds, resetTimer };
};
