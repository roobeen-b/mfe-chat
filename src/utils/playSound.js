const ausSrc = "/assets/audio/notification.wav";
export const playSound = (src = ausSrc) => {
    try {
        const audio = new Audio(src);
        audio.play();
    } catch (error) {
        console.error("Error playing audio:", error);
    }
};
