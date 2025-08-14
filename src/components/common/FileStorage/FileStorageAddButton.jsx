import { useState } from "react";
import { Fab } from "@mui/material";
import { useIntl } from "react-intl";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Spinner } from "@components/bits/Spinner";
import { ChooseFileComp } from "@components/bits/ChooseFileComp/ChooseFileComp";

import { parseObjToFormData } from "@utils/formDataHelpers";
import { useCallAddFiles } from "@api/noAuth/storage/useCallAddFiles";

export const FileStorageAddButton = (props) => {
    const { platformId, onAddFileSuccess } = props;
    const { formatMessage } = useIntl();

    const [image, setImage] = useState([]);

    const { loading, callAddFiles } = useCallAddFiles({
        platformId,
        onSuccess: onAddFileSuccess,
    });

    const handleOnChange = async (v) => {
        const formData = await parseObjToFormData({ images: v });
        callAddFiles({ formData });
        setImage(v);
    };

    return (
        <ChooseFileComp
            showStorage={false}
            className={"fsw-choose-file"}
            dropZoneProps={{ val: image, onChange: handleOnChange }}
        >
            <Fab
                color="primary"
                aria-label="add"
                variant="extended"
                disabled={loading}
                className="fsw-choose-file-fab"
            >
                {loading ? (
                    <Spinner
                        size={20}
                        absolute={false}
                        color="inherit"
                        style={{ marginRight: ".5rem" }}
                    />
                ) : (
                    <AddCircleIcon className="icon" />
                )}
                <span>&nbsp;{formatMessage({ id: "add_files" })}</span>
            </Fab>
        </ChooseFileComp>
    );
};
