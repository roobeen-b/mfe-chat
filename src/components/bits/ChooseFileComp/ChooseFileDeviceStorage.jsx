import { useState } from "react";
import { useIntl } from "react-intl";

import { DropzoneField } from "./DropzoneField";

import { ModalComp } from "../Modal/Modal";
import { CustomPopover } from "../Popover";
import { SelectFileComp1 } from "./SelectFileComp/SelectFileComp1";

import { FileStorageModalContent } from "@components/common/FileStorage/FileStorageModals/FileStorageModalContent";

const sx = {
    borderRadius: 0,
    padding: "0.5rem",
    paddingRight: "2rem",
    color: "text.secondary",
    border: "none",
    backgroundColor: "transparent",
    "&:hover": {
        backgroundColor: "secondary.light",
    },
};

export const ChooseFileDeviceStorage = (props) => {
    const intl = useIntl();
    const { trigger, dropZoneProps, val, onChange, disabled } = props;

    const [openModal, setOpenModal] = useState(false);

    const handleOnClose = () => {
        setOpenModal(false);
    };

    const handleSelectedFile = () => {
        handleOnClose();
    };
    return (
        <>
            <CustomPopover
                disabled={disabled}
                trigger={trigger}
                closeOnClick={false}
                slotProps={{
                    paper: {
                        sx: {
                            padding: "0.5rem",
                            boxShadow: "0px 2px 5px 0px #0619380F !important",
                        },
                    },
                }}
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                transformOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <SelectFileComp1
                    sx={sx}
                    type="storage"
                    label="choose_from_own_storage"
                    onClick={() => setOpenModal(true)}
                />
                <DropzoneField dropZoneProps={dropZoneProps}>
                    <SelectFileComp1
                        sx={sx}
                        type="all"
                        label="choose_from_device"
                    />
                </DropzoneField>
            </CustomPopover>
            <ModalComp
                closeIcon
                maxWidth={600}
                open={openModal}
                modalType={"storage"}
                onClose={handleOnClose}
                actions={<></>}
                title={intl.formatMessage({ id: "choose_from_own_storage" })}
            >
                <FileStorageModalContent
                    storageFiles={val || []}
                    setStorageFiles={onChange}
                    onConfirm={handleSelectedFile}
                />
            </ModalComp>
        </>
    );
};
