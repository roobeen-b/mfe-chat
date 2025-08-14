import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { ButtonGroup, Checkbox, IconButton } from "@mui/material";

import { FileComp } from "@components/bits/FileComp";
import { InputField } from "@components/bits/InputField";

import { downloadFile } from "@utils/fileUtils";
import { Spinner } from "@components/bits/Spinner";
import { userSelector } from "@store/authSlice/selectors";

import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { copyToClipboard } from "@utils/copyToClipboard";

export const FileList = (props) => {
    const {
        fileId,
        loading,
        platform,
        list = [],
        selectFile,
        deleteAFile,
        fileLoading,
        editFileName,
        canOnlySelect,
    } = props;

    return (
        <div className={`fsw-list ${canOnlySelect ? "fsw-modal-list" : ""}`}>
            {list?.map((i, j) => (
                <SingleFileComp
                    detail={i}
                    key={i?.id}
                    fileId={fileId}
                    loading={loading}
                    platform={platform}
                    selectFile={selectFile}
                    deleteAFile={deleteAFile}
                    fileLoading={fileLoading}
                    canOnlySelect={canOnlySelect}
                    editFileName={editFileName?.(i.id, j)}
                />
            ))}
        </div>
    );
};

const ACT_BTN = [
    {
        id: "view",
        show: true,
        title: "view",
        color: "default",
        icon: <VisibilityIcon />,
    },
    {
        id: "copy",
        show: true,
        color: "primary",
        title: "copy_link",
        icon: <FileCopyIcon />,
    },
    {
        show: true,
        id: "download",
        title: "download",
        color: "secondary",
        icon: <DownloadIcon />,
    },
    {
        show: false,
        id: "delete",
        color: "error",
        icon: <DeleteIcon />,
        title: "delete_file",
    },
];

const SingleFileComp = (props) => {
    const { formatMessage } = useIntl();

    const {
        fileId,
        detail,
        loading,
        platform,
        selectFile,
        deleteAFile,
        fileLoading,
        editFileName,
        canOnlySelect,
    } = props;

    const user = useSelector(userSelector);

    const [editable, setEditable] = useState(false);
    const [name, setName] = useState(detail.file_original_name);

    const isSelected = fileId?.includes(detail?.id);
    const isAdmin = platform?.role === "admin";
    const isMod = platform?.role === "moderator";
    const isAdminOrMod = isAdmin || isMod;
    const canDelete =
        !platform?.id || user?.id === detail?.user_id || isAdminOrMod;
    const canEdit =
        !platform?.id || user?.id === detail?.user_id || isAdminOrMod;

    useEffect(() => {
        if (fileLoading === false && isSelected) setEditable(false);
    }, [fileLoading]);

    const handleOnFileClick = (e) => {
        e.stopPropagation();
        if (canOnlySelect) selectFile?.(detail);
    };

    const handleEditName = (e) => {
        e.stopPropagation();
        console.info({ name });
        editFileName?.(name);
    };

    const handleEditCancel = (e) => {
        e.stopPropagation();
        setEditable(false);
        setName(detail.file_original_name);
    };

    const handleActionOnClick = (v) => () => {
        if (v === "view") window?.open?.(detail.file_url, "_blank");

        if (v === "download")
            downloadFile(detail.file_url, detail.file_original_name);

        if (v === "delete")
            deleteAFile?.(detail?.id, detail.file_original_name);

        if (v === "copy") copyToClipboard(detail?.file_url);
    };
    const commonProps = {
        src: detail?.file_url,
        alt: detail?.file_original_name ?? detail?.id,
    };
    const imgProps = {
        width: 200,
        height: 200,
        loading: "lazy",
        ...commonProps,
    };
    const audVidProps = {
        loop: true,
        muted: true,
        type: "comp",
        controls: false,
        ...commonProps,
    };

    return (
        <div
            key={detail?.id}
            onClick={handleOnFileClick}
            className="fsw-list-single"
            title={detail?.file_original_name}
        >
            <div className="fsw-list-single-file">
                <FileComp
                    {...commonProps}
                    appProps={{ ...audVidProps }}
                    audProps={{ ...audVidProps }}
                    vidProps={{ ...audVidProps }}
                    imgProps={{
                        placeholder: "blur",
                        type: "comp",
                        ...imgProps,
                    }}
                />
            </div>
            <div className="fsw-list-single-type">
                {formatMessage({ id: detail?.file_type })}
            </div>
            <InputField
                size="small"
                autoFocus
                value={name}
                disabled={canOnlySelect || !editable}
                onChange={(e) => setName(e?.target?.value)}
                className={`fsw-list-single-name ${
                    editable ? "fsw-list-single-name-edit" : ""
                }`}
                endAdornment={
                    !canOnlySelect &&
                    canEdit && (
                        <ButtonGroup
                            size="small"
                            disabled={loading}
                            variant="contained"
                            disableElevation={true}
                            className="fsw-list-single-name-btn"
                        >
                            {editable ? (
                                fileLoading && isSelected ? (
                                    <Spinner size={16} absolute={false} />
                                ) : (
                                    <>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={handleEditName}
                                            disabled={
                                                !name ||
                                                name ===
                                                    detail.file_original_name ||
                                                loading
                                            }
                                            title={formatMessage({
                                                id: "confirm",
                                            })}
                                        >
                                            <CheckIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="secondary"
                                            title={formatMessage({
                                                id: "cancel",
                                            })}
                                            onClick={handleEditCancel}
                                        >
                                            <ClearIcon fontSize="small" />
                                        </IconButton>
                                    </>
                                )
                            ) : (
                                <IconButton
                                    size="small"
                                    color="primary"
                                    title={formatMessage({ id: "edit" })}
                                    onClick={() => setEditable(true)}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            )}
                        </ButtonGroup>
                    )
                }
            />
            {canOnlySelect ? (
                <Checkbox
                    size="small"
                    checked={isSelected}
                    className="fsw-list-single-checkbox"
                    slotProps={{ input: { "aria-label": "select-file" } }}
                />
            ) : (
                <ButtonGroup className="fsw-list-single-action">
                    {ACT_BTN.map((i) => {
                        if (i.show || canDelete)
                            return (
                                <IconButton
                                    key={i.id}
                                    title={t(i.title)}
                                    color={i.color}
                                    onClick={handleActionOnClick(i.id)}
                                >
                                    {i.icon}
                                </IconButton>
                            );
                        return null;
                    })}
                </ButtonGroup>
            )}
        </div>
    );
};
