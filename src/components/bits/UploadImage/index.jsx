import clsx from "clsx";
import { MyDropzone } from "./MyDropzone";

const UploadImage = ({
    label,
    hasError,
    children,
    className,
    helperText,
    showDropZone = true,
    dropZoneProps: { uploading, className: dCN, ...rest },
}) => {
    return (
        <div className={clsx("", className)}>
            {label && (
                <label
                    className={clsx("block mb-1 text-sm font-medium ", {
                        "text-th-e-m": hasError,
                        "text-gray-900 dark:text-gray-700": !hasError,
                    })}
                >
                    {label}
                </label>
            )}
            <div
                className={clsx(
                    "relative hover:ring-1 ring-blue-200 dark:ring-green-200",
                    dCN
                )}
            >
                {uploading && (
                    <div className="absolute top-0 h-1 w-full bg-th-p-m opacity-40 animate-moveBackAndForth" />
                )}
                {showDropZone ? (
                    <MyDropzone {...rest} className={dCN}>
                        {children}
                    </MyDropzone>
                ) : (
                    children
                )}
            </div>
            {helperText && (
                <p
                    className={clsx("text-xs pl-2 italic mt-0.5", {
                        "text-th-e-m": hasError,
                        "text-gray-500": !hasError,
                    })}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
};

export { UploadImage };
