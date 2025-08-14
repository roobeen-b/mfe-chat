const colorThemes = [
    {
        text: "#fff",
        background: "#3498db",
        border: "#2980b9",
        hover: "#1f77b4",
    },
    {
        text: "#fff",
        background: "#2ecc71",
        border: "#27ae60",
        hover: "#219653",
    },
    {
        text: "#fff",
        background: "#e74c3c",
        border: "#c0392b",
        hover: "#d63031",
    },
    {
        text: "#fff",
        background: "#f39c12",
        border: "#d35400",
        hover: "#e67e22",
    },
    {
        text: "#fff",
        background: "#9b59b6",
        border: "#8e44ad",
        hover: "#a569bd",
    },
    {
        text: "#fff",
        background: "#16a085",
        border: "#1abc9c",
        hover: "#138d75",
    },
    {
        text: "#fff",
        background: "#e67e22",
        border: "#d35400",
        hover: "#d35400",
    },
    {
        text: "#fff",
        background: "#ff6384",
        border: "#e84855",
        hover: "#ff6384",
    },
    {
        text: "#fff",
        background: "#4bc0c0",
        border: "#45a9a9",
        hover: "#4bc0c0",
    },
    {
        text: "#fff",
        background: "#ffa07a",
        border: "#ff7f50",
        hover: "#ffa07a",
    },
    {
        text: "#fff",
        background: "#8a2be2",
        border: "#7d26cd",
        hover: "#8a2be2",
    },
    {
        text: "#fff",
        background: "#ff4500",
        border: "#e23d00",
        hover: "#ff4500",
    },
    {
        text: "#fff",
        background: "#00bfff",
        border: "#009ac7",
        hover: "#00bfff",
    },
    {
        text: "#fff",
        background: "#ff69b4",
        border: "#ff5c9e",
        hover: "#ff69b4",
    },
    {
        text: "#fff",
        background: "#32cd32",
        border: "#2db82d",
        hover: "#32cd32",
    },
    {
        text: "#fff",
        background: "#ff8c00",
        border: "#ff7f00",
        hover: "#ff8c00",
    },
    {
        text: "#fff",
        background: "#9932cc",
        border: "#8a2be2",
        hover: "#9932cc",
    },
];
const colorsLength = colorThemes.length;
const generateRandomColorTheme = (index) => {
    if (index) {
        const idx = index < colorsLength ? index : index - colorsLength;
        return colorThemes[idx];
    }

    const randomIndex = Math.floor(Math.random() * colorsLength);
    return colorThemes[randomIndex];
};

export { generateRandomColorTheme };
// // Example usage
// const selectedColorTheme = generateRandomColorTheme();
// console.log(selectedColorTheme);
