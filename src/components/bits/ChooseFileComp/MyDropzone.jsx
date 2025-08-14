import { useCallback } from "react";
import { useIntl } from "react-intl";
import { useDropzone } from "react-dropzone";

import clsx from "clsx";

// import { isDev } from "@utils/myFunc";
import { SnackBar } from "@utils/toast";
import { acceptFile } from "./acceptFile";
import { getFileType } from "@utils/fileUtils";
import { callImageCompression, MAX_FILE_COUNT } from "@utils/imageUtils";

const MyDropzone = ({
    val,
    className,
    maxFileSize,
    maxVideoSize,
    maxImageSize,
    type = "all",
    disabled = false,
    multiple = false,
    maxFile = MAX_FILE_COUNT,

    children,

    onChange,
    setUploading,
}) => {
    const doNotTranslate = true;
    const intl = useIntl();

    const handleUploading = (v) => setUploading?.(v);

    const checkIsImgVideSizeBig = async (file) => {
        if (maxImageSize && getFileType(file) === "image") {
            if (file?.size > maxImageSize * 1024 * 1024) {
                const errMsg = `img_upload_image_limit`;
                const message = intl.formatMessage(
                    { id: `${errMsg}` },
                    { size: `${maxFileSize}Mb` }
                );
                SnackBar({ doNotTranslate, message }, "warning");
                return true;
            }
        }
        if (maxVideoSize && getFileType(file) === "video") {
            if (file?.size > maxVideoSize * 1024 * 1024) {
                const errMsg = `img_upload_video_limit`;
                const message = intl.formatMessage(
                    { id: `${errMsg}` },
                    { size: `${maxFileSize}Mb` }
                );
                SnackBar({ doNotTranslate, message }, "warning");
                return true;
            }
        }
        return false;
    };

    const checkFileCountWithinLimit = async (files) => {
        const cl = val.length;
        const nl = files.length;
        if (cl + nl <= maxFile) return true;
        else {
            const errMsg = `img_upload_too_many_files`;
            const message = intl.formatMessage(
                { id: `${errMsg}` },
                { count: maxFile }
            );
            SnackBar({ doNotTranslate, message }, "warning");
            return false;
        }
    };

    const parseFiles = async (acceptedFiles) => {
        const accFiles = [];
        let allSmallFiles = true;
        const filesWithinLimit = await checkFileCountWithinLimit(acceptedFiles);

        if (!filesWithinLimit) return [];

        for (const file of acceptedFiles) {
            // Check for image and video size
            const isImgVideSizeBig = await checkIsImgVideSizeBig(file);

            if (isImgVideSizeBig) {
                allSmallFiles = false;
                break;
            }

            const compressedFile = await callImageCompression(file);
            accFiles.push(compressedFile);
        }

        return allSmallFiles ? accFiles : [];
    };

    const onDrop = useCallback(
        async (acceptedFiles) => {
            console.info({ acceptedFiles });
            handleUploading(true);
            const parsedFiles = await parseFiles(acceptedFiles);
            onChange(parsedFiles);
            handleUploading(false);
            // Do something with the files
        },
        [val]
    );

    const handleDropRejected = (err) => {
        // isDev && console.error({ handleDropRejected: err });
        const e = err?.[0]?.errors?.[0]?.code;
        if (e) {
            const errMsg = `img_upload_${e?.replace(/-/g, "_")}`;
            const message = intl.formatMessage(
                { id: `${errMsg}` },
                { count: maxFile, size: `${maxFileSize}Mb` }
            );

            SnackBar({ doNotTranslate, message }, "warning");
            handleUploading(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        disabled,
        multiple,
        maxFiles: maxFile,
        accept: acceptFile(type),
        onDropRejected: handleDropRejected,
        maxSize: maxFileSize ? maxFileSize * 1024 * 1024 : undefined,
    });

    return (
        <div
            {...getRootProps()}
            className={clsx(className, {
                "drop-zone-active": isDragActive,
            })}
        >
            <input {...getInputProps()} />
            {children}
        </div>
    );
};

export { MyDropzone };
