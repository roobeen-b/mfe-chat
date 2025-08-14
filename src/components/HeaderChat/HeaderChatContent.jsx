"use client";

import { Divider, Typography } from "@mui/material";

import { useIntl } from "react-intl";

import { HeaderChatList } from "./HeaderChatList";
import { ButtonComp } from "@components/bits/Button";
import { EmptyArea } from "@components/bits/EmptyArea";
import { HeaderChatPopoverWrapper } from "./HeaderChatPopoverWrapper";
import { NotificationMessageSkeleton } from "@components/bits/Skeleton/NotificationMessageSkeleton";

import { useCallInquireFetch } from "@api/helpers/inquire/useCallInquireFetch";
import { Link } from "react-router";

const fallbackData = {
  success: 1,
  statusCode: 200,
  message: "default fallback",
  data: { rows: [], count: 0 },
};

export const HeaderChatContent = () => {
  const { formatMessage } = useIntl();
  const {
    list,
    count = 0,
    // mutate,
    loading,
  } = useCallInquireFetch(fallbackData, { offset: 0, limit: 10 });

  return (
    <HeaderChatPopoverWrapper className="hw-right-notification-popover hc-pw">
      <Typography gutterBottom color="secondary" className="hc-pw-title">
        <b>{formatMessage({ id: "chat" })}</b>
      </Typography>
      <Divider className="hc-pw-divider" />
      {count === 0 && !loading && (
        <EmptyArea
          title=""
          iconWidth="220px"
          className="hc-pw-empty-area"
          subtitle="no_messages_yet_check_later"
        />
      )}
      {loading && <NotificationMessageSkeleton />}
      <HeaderChatList list={list} className="hc-pw-list" />
      <div className="hc-pw-button">
        <ButtonComp
          fullWidth
          component={Link}
          color="primary"
          disableElevation
          href="/inquiry"
          variant="contained"
        >
          {formatMessage({ id: "see_all_chats" })}
        </ButtonComp>
      </div>
    </HeaderChatPopoverWrapper>
  );
};
