import clsx from "clsx";
import { useEffect } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

import { FileComp } from "../FileComp";
import { getFileType, getObjectURLSrc, getRandomString } from "../../../utils";
import { ViewFiles1Wrapper } from "./ViewFiles1Wrapper";

const DisplayFileItem = ({ file, className, onRemove }) => {
    const type = getFileType(file);
    const src = getObjectURLSrc(file);
    const isFile = typeof file !== "string";

    const revokeUrl = () => {
        const isCreateObjectURL = src && typeof src === "string";
        if (isFile && isCreateObjectURL) {
            URL.revokeObjectURL(src);
        }
    };

    useEffect(() => {
        return () => {
            revokeUrl();
        };
    }, []);

    const handleRemove = () => {
        revokeUrl();
        onRemove?.();
    };

    return (
        <div className={clsx("relative", className)}>
            <a
                className="text-center"
                href={isFile ? "#" : src}
                target={isFile ? "" : "_blank"}
            >
                <FileComp
                    src={src}
                    type={type}
                    alt={`img-${getRandomString(3)}`}
                    // vidProps={{ loop: true, muted: true, controls: true }}
                    imgProps={{ type: "comp", width: 250, height: 250, src }}
                    // audProps={{ loop: true, muted: true, controls: true, className: "" }}
                    className="w-full h-full object-contain border border-gray-300 "
                />
            </a>

            {onRemove && (
                <div
                    onClick={handleRemove}
                    className="absolute top-0 right-0 h-[unset] w-[unset] bottom-[unset] left-[unset] cursor-pointer hover:scale-110"
                >
                    <CancelIcon className="w-6 h-6 text-th-a" />
                </div>
            )}
        </div>
    );
};

export const ViewFiles1 = ({ files, onChange }) => {
    const l = files.length;

    const handleRemove = (idx) => () => {
        const tempList = [...files];
        tempList.splice(idx, 1);
        if (onChange) onChange(tempList);
    };

    return (
        <ViewFiles1Wrapper length={l} className="vfw">
            {files?.map((f, i) => {
                return (
                    <DisplayFileItem
                        file={f}
                        key={`${i}`}
                        onRemove={onChange ? handleRemove(i) : undefined}
                        className={clsx("vfw-all", {
                            "vfw-1 ": l === 1,
                            "vfw-2 ": l === 2,
                            "vfw-3 ": l === 3,
                            "vfw-4 ": l === 4,
                            "vfw-5 ": l === 5,
                            "vfw-more ": l > 5,
                        })}
                    />
                );
            })}
        </ViewFiles1Wrapper>
    );
};
