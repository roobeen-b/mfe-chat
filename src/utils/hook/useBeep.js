import { useCallback } from "react";

/** 🔊 Custom Hook to Play Beep */
const useBeep = () => {
    const playBeep = useCallback(
        ({ type = "sine", volume = 0.2, duration = 200, frequency = 440 }) => {
            const audioCtx = new (window.AudioContext ||
                window.webkitAudioContext)();

            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();

            // Apply configurations
            oscillator.type = type;
            oscillator.frequency.setValueAtTime(
                frequency,
                audioCtx.currentTime
            );
            gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

            // Connect nodes
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);

            // Play sound
            oscillator.start();
            setTimeout(() => {
                oscillator.stop();
                audioCtx.close(); // Cleanup
            }, duration);
        },
        []
    );

    return playBeep;
};

export default useBeep;
