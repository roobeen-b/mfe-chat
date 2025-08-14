import { useIntl } from "react-intl";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect, useRef, useState } from "react";

import {
  useDebounce,
  useTabQuery,
  useOnIntersectionObserver,
} from "@utils/index";
import { TableConfig } from "@config/config";
import { setConvoDetails } from "@store/extraSlice";
import { convoRelatedDetailsSelector } from "@store/extraSlice/selectors";
import { useCallInfiniteInquireFetch } from "@api/helpers/inquire/useCallInfiniteInquireFetch";
import { useCallGetMessageNotificationCount } from "@api/helpers/inquire/conversation/useCallGetMessageNotificationCount";

import { MessageListComp } from "./MessageListComp";
import OnlyTabComp from "@components/bits/Tabs/Tabs";
import { EmptyArea } from "@components/bits/EmptyArea";
import { InputField } from "@components/bits/InputField";
import { NotificationMessageSkeleton } from "@components/bits/Skeleton/NotificationMessageSkeleton";
import { useNavigate } from "react-router";

const tabList = [
  { alias: "private", label: "personal_chat" },
  { alias: "group", label: "group_chat" },
];

export const MessageList = (props) => {
  const { conversation_type } = props;
  const rootRef = useRef(null);
  const navigate = useNavigate();
  const { onTabChange, activeTabIndex } = useTabQuery({
    list: tabList.map((item) => item.alias),
    val: tabList[0].alias,
  });

  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery);

  const convoDetails = useSelector(convoRelatedDetailsSelector);

  const {
    privateCount,
    groupCount,
    mutate: mutate2,
  } = useCallGetMessageNotificationCount();

  const { mutate, list, count, setSize, isReachingEnd, loading } =
    useCallInfiniteInquireFetch({
      limit: TableConfig.defaultPerPage,
      search_query: debouncedSearchQuery,
      conversation_type: tabList[activeTabIndex].alias || conversation_type,
    });

  useEffect(() => {
    if (convoDetails?.fetchConvo) {
      mutate();
      mutate2();
    }
  }, [convoDetails?.fetchConvo]);

  useEffect(() => {
    const { fetchConvo, deletedConvoId } = convoDetails || {};

    if (fetchConvo) {
      if (list.length === 0) {
        navigate(`/inquiry`);
      } else if (pathname.split("/").pop() == deletedConvoId) {
        navigate(`/inquiry/${list[0].conversation_id}`);
      }
      dispatch(setConvoDetails(null));
    }
  }, [convoDetails, list]);

  const handleOnIntersect = () => {
    if (!loading && !isReachingEnd) {
      setTimeout(() => setSize(), 500);
    }
  };

  const observerRef = useOnIntersectionObserver({
    threshold: 1,
    rootMargin: "0px",
    root: rootRef.current,
    onIntersect: handleOnIntersect,
    enabled: !isReachingEnd, // Disable observer if we've reached the end
  });

  const handleTabChange = (newValue) => {
    onTabChange(tabList[newValue].alias);
  };

  return (
    <div className="ms-mw-body" ref={rootRef}>
      <InputField
        size="small"
        variant="outlined"
        value={searchQuery}
        className="ms-mw-body-search"
        placeholder={formatMessage({ id: "search_messages" })}
        endAdornment={<SearchIcon fontSize="small" />}
        onChange={(e) => setSearchQuery(e.target?.value)}
      />

      <Suspense>
        <OnlyTabComp
          noBorder
          hasBadge
          tabList={tabList?.map((item) => ({
            ...item,
            count: item.alias === "private" ? privateCount : groupCount,
          }))}
          activeTabIndex={activeTabIndex}
          handleTabChange={handleTabChange}
        />
      </Suspense>
      <br />

      {count === 0 && !loading && (
        <EmptyArea
          title=""
          iconWidth="200px"
          className="ms-mw-body-p1"
          subtitle="no_messages_yet_check_later"
        />
      )}
      <MessageListComp list={list} className="ms-mw-body-list" />
      {loading && (
        <NotificationMessageSkeleton
          length={2}
          className="ms-mw-body-p1 ms-mw-body-pr0"
        />
      )}
      {parseInt(`${count}`) > 10 && isReachingEnd && (
        <EmptyArea
          title=""
          iconWidth="100px"
          className="ms-mw-body-p1"
          subtitle={list.length === 0 ? undefined : "you_have_reached_the_end"}
        />
      )}
      {!isReachingEnd && !loading && (
        <div ref={observerRef} className="ms-mw-body-ref" />
      )}
    </div>
  );
};
