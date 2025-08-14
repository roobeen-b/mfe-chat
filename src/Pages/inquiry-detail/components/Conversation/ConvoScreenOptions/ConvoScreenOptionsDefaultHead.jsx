import { useRef } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { PencilSquare } from "@components/_icons";
import { Spinner } from "@components/bits/Spinner";
import { AvatarComp } from "@components/bits/FileComp/Avatar";
import { ChooseFileComp } from "@components/bits/ChooseFileComp/ChooseFileComp";

import { SnackBar } from "@utils/toast";
import { userSelector } from "@store/authSlice/selectors";
import { toggleConvoRelatedModal } from "@store/extraSlice";
import { parseObjToFormData } from "@utils/formDataHelpers";
import { useConversationSocket } from "../context/ConversationProvider";
import { useCallAddChatFiles } from "@api/helpers/inquire/conversation/useCallAddChatFiles";

export const ConvoScreenOptionsDefaultHead = (props) => {
    const {} = props;
    const { members, convoUpdate, callUpdateConvoEvent } =
        useConversationSocket();
    const { name, image } = convoUpdate;
    const mmb = Object.values(members);
    const dispatch = useDispatch();
    const { formatMessage } = useIntl();

    const user = useSelector(userSelector);

    const adminEmail = mmb.find((i) => i.role === "admin")?.email;
    const isAdmin = user?.email === adminEmail;

    const imageRef = useRef([]);

    const onAddFileSuccess = (data) => {
        callUpdateConvoEvent({
            update_type: "GROUP_IMAGE_CHANGED",
            new_group_image: data?.data?.[0]?.url,
        });
    };

    const onAddFileError = () => {};
    const { loading, callAddChatFiles } = useCallAddChatFiles({
        onSuccess: onAddFileSuccess,
        onError: onAddFileError,
    });

    const showOnlyAdminCanEditError = () => {
        const message = formatMessage({ id: "only_admin_can_edit" });
        SnackBar({ message, doNotTranslate: true }, "error");
    };
    const handleOnChange = async (v) => {
        imageRef.current = v;
        const formData = await parseObjToFormData({ files: v });
        callAddChatFiles({ formData, endpoint: "chat" });
    };

    const handleEditClick = (v) => () => {
        if (!isAdmin) {
            showOnlyAdminCanEditError();
            return;
        }
        dispatch(
            toggleConvoRelatedModal({ mType: v, adminEmail, convoName: name })
        );
    };

    return (
        <div className="cs-ow-head cs-ow-p1">
            <div className="cs-ow-head-image">
                <AvatarComp
                    alt={name}
                    src={image}
                    variant="circular"
                    sx={{ width: 60, height: 60 }}
                    className="cs-ow-head-image-avatar"
                />
                {isAdmin && (
                    <ChooseFileComp
                        showStorage={false}
                        className={"cs-ow-head-image-choose-file"}
                        dropZoneProps={{
                            disabled: loading,
                            val: imageRef?.current,
                            onChange: handleOnChange,
                        }}
                    >
                        <IconButton
                            size="small"
                            className="cs-ow-head-image-edit"
                        >
                            {loading ? (
                                <Spinner absolute={false} size={10} />
                            ) : (
                                <CameraAltIcon
                                    fontSize="small"
                                    sx={{ fontSize: "1rem" }}
                                />
                            )}
                        </IconButton>
                    </ChooseFileComp>
                )}
            </div>
            <Typography variant="h6" align="center" className="cs-ow-head-name">
                <b>{name}</b>&nbsp;
                <IconButton size="small" onClick={handleEditClick("edit")}>
                    <PencilSquare fontSize="small" sx={{ fontSize: "1rem" }} />
                </IconButton>
            </Typography>
            <Typography
                align="center"
                color="textSecondary"
                className="cs-ow-head-members"
            >
                {mmb.length}&nbsp;{formatMessage({ id: "members" })}
            </Typography>
        </div>
    );
};
