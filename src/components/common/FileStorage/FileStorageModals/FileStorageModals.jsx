import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { Typography } from "@mui/material";

import { Spinner } from "@components/bits/Spinner";
import { ButtonComp } from "@components/bits/Button";
import { ModalComp } from "@components/bits/Modal/Modal";
import { FileRelatedModalsWrapper } from "./FileRelatedModalsWrapper";

import { toggleFileRelatedModal } from "@store/extraSlice";
import { fileRelatedModalSelector } from "@store/extraSlice/selectors";

import { SnackBar, useIsMounted } from "@utils/index";
import { useCallDeleteFile } from "@api/helpers/storage/useCallDeleteFile";

const ModalType = {
    delete: "delete",
};

export const FileStorageModals = (props) => {
    const { onSuccess } = props;
    const dispatch = useDispatch();
    const isMounted = useIsMounted();
    const { formatMessage } = useIntl();

    const fileModal = useSelector(fileRelatedModalSelector);
    const mModalType = fileModal?.mType;

    const handleOnsuccess = () => {
        const message = formatMessage(
            { id: "file_deleted" },
            { file: fileModal?.name }
        );
        SnackBar({ message, doNotTranslate: true }, "success");
        closeModal();
        onSuccess?.("delete");
    };

    const { loading, callDeleteFile } = useCallDeleteFile({
        platformId: fileModal?.platformId,
        onSuccess: handleOnsuccess,
    });

    const closeModal = () => {
        dispatch(toggleFileRelatedModal(null));
    };

    const Title = {
        delete: formatMessage({ id: "delete_file" }),
    };

    const handleOnDelete = () => {
        callDeleteFile({
            data: { file_ids: [fileModal?.id] },
        });
    };

    if (!isMounted) return null;

    const title = mModalType ? Title[mModalType] : undefined;
    const modalType = mModalType ? ModalType[mModalType] : undefined;

    return (
        <ModalComp
            closeIcon
            title={title}
            noIcon={false}
            onClose={closeModal}
            modalType={modalType}
            open={Boolean(mModalType)}
            actions={
                <>
                    {mModalType === "delete" && (
                        <>
                            <ButtonComp
                                color="error"
                                sx={{ flex: 2 }}
                                disableElevation
                                isLoading={loading}
                                variant="contained"
                                onClick={handleOnDelete}
                            >
                                {formatMessage({ id: "delete" })}
                            </ButtonComp>
                            <ButtonComp
                                sx={{ flex: 1 }}
                                color="secondary"
                                disableElevation
                                variant="contained"
                                onClick={closeModal}
                            >
                                {formatMessage({ id: "cancel" })}
                            </ButtonComp>
                        </>
                    )}
                </>
            }
        >
            <FileRelatedModalsWrapper className="mcr-mw">
                {mModalType === "delete" && (
                    <>
                        <Typography align="left" gutterBottom>
                            {formatMessage(
                                { id: "are_you_sure_you_want_to_delete" },
                                { file: fileModal?.name }
                            )}
                        </Typography>
                    </>
                )}
                {loading && <Spinner size={32} />}
            </FileRelatedModalsWrapper>
        </ModalComp>
    );
};
