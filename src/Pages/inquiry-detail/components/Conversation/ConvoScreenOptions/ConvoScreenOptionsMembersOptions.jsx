import { useIntl } from "react-intl";

import MessageIcon from "@mui/icons-material/Message";
import { IconButton, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { CustomPopover } from "@components/bits/Popover";
import { ConvoScreenOptionsMembersOptionsWrapper } from "./ConvoScreenOptionsWrapper";

const Options = [
    {
        link: "#",
        label: "message",
        icon: <MessageIcon fontSize="small" />,
        getAllowed: (_, isSelf, __) => {
            return !isSelf; // can message everyone except self
        },
    },
    {
        label: "view_profile",
        link: "/profile/",
        icon: <AccountCircleIcon fontSize="small" />,
        getAllowed: () => true, // can view everyone's profile
    },
    {
        link: "#",
        label: "make_admin",
        icon: <AdminPanelSettingsIcon fontSize="small" />,
        getAllowed: (isAdmin, isSelf, __) => {
            return isAdmin && !isSelf; // Admin can make others admin
        },
    },
    {
        link: "#",
        label: "remove_member",
        icon: <PersonRemoveIcon fontSize="small" />,
        getAllowed: (isAdmin, isSelf, isMemberAdmin) => {
            return isAdmin && !isSelf && !isMemberAdmin; // Admin can remove others(non admin)
        },
    },
    {
        link: "#",
        label: "remove_admin",
        icon: <AdminPanelSettingsIcon fontSize="small" />,
        getAllowed: (isAdmin, isSelf, isMemberAdmin) => {
            return isAdmin && !isSelf && isMemberAdmin; // Admin can remove other admins
        },
    },
    {
        link: "#",
        label: "leave_group",
        icon: <ExitToAppIcon fontSize="small" />,
        getAllowed: (_, isSelf) => {
            return isSelf; // Self can leave group
        },
    },
];

export const ConvoScreenOptionsMembersOptions = (props) => {
    const { isAdmin, isSelf, className, onAction, isMemberAdmin } = props;

    const { formatMessage } = useIntl();

    const filteredOptions = Options.filter((option) => {
        try {
            return option.getAllowed(isAdmin, isSelf, isMemberAdmin);
        } catch (error) {
            console.error(
                `Error evaluating getAllowed for option: ${option.label}`,
                error
            );
            return false;
        }
    });

    const handleClick = (option) => (e) => {
        if (!option?.link || option.link === "#") {
            e.preventDefault();
            onAction(option.label);
        }
    };

    return (
        <CustomPopover
            slotProps={{
                paper: {
                    sx: {
                        padding: "0.5rem",
                        boxShadow: "0px 2px 5px 0px #0619380F !important",
                    },
                },
            }}
            trigger={
                <IconButton
                    size="small"
                    className={`cs-ow-members-list-li-options ${
                        className || ""
                    }`}
                >
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            }
        >
            <ConvoScreenOptionsMembersOptionsWrapper className="cs-ow-cp">
                {filteredOptions.map((option) => (
                    <Link
                        key={option.label}
                        href={option?.link || "#"}
                        onClick={handleClick(option)}
                        className="cs-ow-cp-item"
                    >
                        {option.icon}
                        <Typography variant="caption">
                            {formatMessage({ id: option.label })}
                        </Typography>
                    </Link>
                ))}
            </ConvoScreenOptionsMembersOptionsWrapper>
        </CustomPopover>
    );
};
