import useSWR from "swr";

import { GetApi } from "@api/api";
import { ChatLink } from "@api/link";
import { handleDefaultError } from "@api/utils";

const errKey = "default_error_message";

const link = `${ChatLink}/fetch/unread-conversation`;
export const useCallGetMessageNotificationCount = () => {
    const { data, error, mutate, isLoading } = useSWR(
        link,
        (url) =>
            GetApi(url, {
                arg: { endpoint: "chat" },
            }),
        { onError: handleDefaultError(errKey), refreshInterval: 5 * 60 * 1000 }
    );

    return {
        error,
        mutate,
        loading: isLoading,
        groupCount: data?.data?.unread_group_count || 0,
        count: data?.data?.unread_conversations_count || 0,
        privateCount: data?.data?.unread_private_count || 0,
    };
};
