import { useState } from "react";
import { Fab } from "@mui/material";
import { useIntl } from "react-intl";

import { PencilSquare } from "@components/_icons";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";

import { CustomPopover } from "@components/bits/Popover";
import { CreateGroupChatModal } from "./CreateGroupChatModal";
import { CreateGroupChatPopoverWrapper } from "./CreateGroupChatModalWrapper";

const CONVO_TYPES = [
    {
        type: "private",
        label: "personal_chat",
    },
    {
        type: "group",
        label: "group_chat",
    },
];

export const CreateGroupChat = (props) => {
    const { size = "medium" } = props;

    const { formatMessage } = useIntl();

    const [open, setOpen] = useState(false);
    const [conversationType, setConversationType] = useState("private");

    const isSmall = size === "small";

    const handleOnClick = (v) => {
        setConversationType(v);
        setOpen(true);
    };
    return (
        <>
            <CustomPopover
                slotProps={{
                    paper: {
                        sx: {
                            padding: "0.35rem",
                            boxShadow: "0px 2px 5px 0px #0619380F !important",
                        },
                    },
                }}
                trigger={
                    <Fab
                        aria-label="create_new_chat"
                        title={formatMessage({ id: "create_new_chat" })}
                        // onClick={() => setOpen(true)}
                        size={isSmall ? "small" : "medium"}
                        color={isSmall ? "default" : "secondary"}
                        variant={isSmall ? "circular" : "extended"}
                        sx={{
                            zIndex: 1,
                            boxShadow: "none",
                            width: isSmall ? "28px" : undefined,
                            height: isSmall ? "28px" : undefined,
                            minHeight: isSmall ? "28px" : undefined,
                            backgroundColor: isSmall
                                ? "transparent"
                                : undefined,
                        }}
                    >
                        <PencilSquare
                            fontSize="small"
                            sx={{ fontSize: isSmall ? "1rem" : "1.25rem" }}
                        />
                        {!isSmall && (
                            <> &nbsp;{formatMessage({ id: "create" })}</>
                        )}
                    </Fab>
                }
            >
                <CreateGroupChatPopoverWrapper className="cgc-pw">
                    {CONVO_TYPES.map((option) => {
                        return (
                            <div
                                key={option.type}
                                className="cgc-pw-menu"
                                onClick={() => handleOnClick(option.type)}
                            >
                                {option.type === "private" ? (
                                    <PersonIcon fontSize="inherit" />
                                ) : (
                                    <PeopleIcon fontSize="inherit" />
                                )}
                                {formatMessage({ id: option.label })}
                            </div>
                        );
                    })}
                </CreateGroupChatPopoverWrapper>
            </CustomPopover>

            <CreateGroupChatModal
                type={conversationType}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
};
