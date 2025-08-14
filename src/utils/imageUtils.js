import { isDev } from "./myFunc";
import { getFileType } from "./fileUtils";
import imageCompression from "browser-image-compression";

export const MAX_FILE_SIZE = 5;
export const MAX_FILE_COUNT = 3;
export const MAX_WIDTH_HEIGHT = 1920;

export const callImageCompression = async (
    imageFile,
    options = {
        useWebWorker: true,
        maxSizeMB: MAX_FILE_SIZE,
        maxWidthOrHeight: MAX_WIDTH_HEIGHT,
    }
) => {
    if (getFileType(imageFile) === "image") {
        try {
            const compressedFile = await imageCompression(imageFile, options);
            if (isDev) {
                console.info(
                    "compressedFile_Blob",
                    compressedFile instanceof Blob,
                    compressedFile
                );
                console.info(
                    `compressedFile_size=${compressedFile.size / 1024 / 1024}MB`
                );
            }
            return compressedFile;
        } catch (error) {
            console.error("callImageCompression=>", error);
            return imageFile;
        }
    }
    return imageFile;
};
