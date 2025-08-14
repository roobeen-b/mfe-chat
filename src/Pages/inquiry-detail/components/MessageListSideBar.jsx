import { useIntl } from "react-intl";
import { Link } from "react-router";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { MessageList } from "./MessageList/MessageList";
import { MessageListSideBarWrapper } from "./MessageListSideBarWrapper";
// import { CreateGroupChat } from "../../../(main_layout)/inquiry/_component/CreateGroupChat/CreateGroupChat";

export const MessageListSideBar = (props) => {
  const { className, toggleConvoMenu } = props;

  const { formatMessage } = useIntl();

  return (
    <MessageListSideBarWrapper className={className + " ms-mw"}>
      <div className="ms-mw-head">
        <IconButton
          size="small"
          component={Link}
          href="/inquiry/"
          className="ms-mw-head-back"
          // onClick={() => router.back()}
        >
          <ArrowBackIosIcon fontSize="small" />
        </IconButton>
        <Typography color="text.primary" className="ms-mw-head-title">
          <b>{formatMessage({ id: "chat" })}</b>
        </Typography>
        {/* <CreateGroupChat size="small" /> */}
        {toggleConvoMenu && (
          <IconButton
            size="small"
            onClick={toggleConvoMenu}
            className="ms-mw-head-close"
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        )}
      </div>
      {/* <Divider /> */}
      <MessageList className="ms-mw-body" />
    </MessageListSideBarWrapper>
  );
};
