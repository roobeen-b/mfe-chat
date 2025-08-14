import { SnackBar } from ".";

export const copyToClipboard = (
    content,
    successMessage = "copied_successfully",
    errorMessage = "copied_failed"
) => {
    if (typeof window !== "undefined" && "clipboard" in navigator) {
        navigator.clipboard
            .writeText(content)
            .then(() => {
                console.info(successMessage);
                SnackBar({ message: "copied_successfully" }, "success");
            })
            .catch(() => {
                console.error(errorMessage);
                SnackBar({ message: "error_copying" }, "error");
            });
    } else {
        console.info("Link to be copied:", content);
        console.error("Clipboard API not available in this environment.");
    }
};
