import React, { useState } from "react";
import { LinearProgress } from "@mui/material";

import { DropzoneField } from "./DropzoneField";
import { ChooseFileDeviceStorage } from "./ChooseFileDeviceStorage";

export const ChooseFileComp = (props) => {
    const {
        device,
        storage,
        disabled,
        children,
        className,
        showStorage = false,
        handleFilesOnDevice,
        handleFilesOnStorage,
        dropZoneProps: dz = {},
    } = props;

    const [uploading, setUploading] = useState(false);

    const handleFileOnChange = (v) => {
        console.log({ handleFileOnChangeDropZoneProps: v });
        handleFilesOnDevice?.(v);
    };

    const dropZoneProps = {
        uploading,
        maxFile: 5,
        setUploading,
        val: device || [],
        className: "cfc-dropzone",
        onChange: handleFileOnChange,
        ...dz,
    };
    if (showStorage)
        return (
            <div className={className + " cfc-with-storage"}>
                {uploading && (
                    <LinearProgress sx={{ height: "2px" }} color="secondary" />
                )}
                {handleFilesOnStorage && (
                    <ChooseFileDeviceStorage
                        val={storage}
                        trigger={children}
                        disabled={disabled}
                        dropZoneProps={dropZoneProps}
                        onChange={handleFilesOnStorage}
                    />
                )}
            </div>
        );
    else
        return (
            <DropzoneField
                dropZoneProps={dropZoneProps}
                className={className + " cfc-without-storage"}
            >
                {children}
            </DropzoneField>
        );
};
