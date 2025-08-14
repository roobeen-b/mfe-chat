import { getStringFromUri } from "../../../utils";
import CancelIcon from "@mui/icons-material/Cancel";

export const ViewFileList = (props) => {
    const { files, onChange, disabled = false } = props;

    const handleRemove = (idx) => () => {
        if (disabled) return;
        const tempList = [...files];
        tempList.splice(idx, 1);
        if (onChange) onChange(tempList);
    };

    return (
        <div className="flex flex-col">
            {files?.length > 0 &&
                files?.map((file, index) => {
                    const title =
                        file === "string" ? getStringFromUri(file) : file?.name;

                    return (
                        <div
                            key={index}
                            className="flex p-0 fap-1 items-center break-all text-xs"
                        >
                            <span className="opacity-50 whitespace-nowrap">
                                {title}&emsp;
                            </span>
                            {onChange && !disabled && (
                                <CancelIcon
                                    onClick={handleRemove(index)}
                                    className="w-4 h-4 text-th-a  cursor-pointer hover:scale-110"
                                />
                            )}
                        </div>
                    );
                })}
        </div>
    );
};
