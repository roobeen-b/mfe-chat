const imageTypes = [".png", ".gif", ".jpeg", ".jpg"];
const videoTypes = [".ogg", ".mp4", ".webm", ".mov", ".mkv"];
const audioTypes = [".mp3", ".webm", ".mp4", ".mp3", ".wav"];
const applicationTypes = [
    ".csv",
    ".txt",
    ".pdf",
    ".mp4",
    ".doc",
    ".xls",
    ".ppt",
    ".pptx",
    ".xlsx",
    ".pptx",
    ".docx",
    ".pptx",
];

const AllAppTypes = {
    "text/csv": [".csv"],
    "text/plain": [".txt"],
    "application/*": applicationTypes,
    "application/pdf": [".pdf"],
    "application/mp4": [".mp4"],
    "application/msword": [".doc"],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.ms-powerpoint": [".ppt"],
    "application/vnd.ms-powerpoint.*": [".pptx"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
    ],
    "application/vnd.openxmlformats-officedocument.presentationml.slideshow": [
        ".pptx",
    ],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
        ".docx",
    ],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        [".pptx"],
};

const acceptFile = (type) => {
    switch (type) {
        case "csv":
            return { "text/csv": [".csv"] };
        case "image":
            return { "image/*": imageTypes };
        case "video":
            return { "video/*": videoTypes };
        case "audio":
            return { "audio/*": audioTypes };
        case "application":
            return AllAppTypes;
        case "image_video":
            return { "image/*": imageTypes, "video/*": videoTypes };
        case "image_audio":
            return { "image/*": imageTypes, "audio/*": audioTypes };
        case "image_video_audio":
            return {
                "image/*": imageTypes,
                "video/*": videoTypes,
                "audio/*": audioTypes,
            };

        case "all":
        default:
            return {};
    }
};

export { acceptFile };
