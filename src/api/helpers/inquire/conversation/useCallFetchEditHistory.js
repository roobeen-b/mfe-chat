import useSWR from "swr";

import { GetApi } from "@api/api";
import { ChatLink } from "@api/link";
import { handleDefaultError } from "@api/utils";

const errKey = "fetch_messages_error";
const link = `${ChatLink}/fetch/updated-message/`;

export const useCallFetchEditHistory = ({ id, cId }) => {
    const { mutate, data, isLoading } = useSWR(
        id ? `${link}${id}?conversation_id=${cId}` : null,
        (url) => GetApi(url, { arg: { endpoint: "chat" } }),
        {
            onError: handleDefaultError(errKey),
            dedupingInterval: 5000, // Prevent calling the API again within this interval
            revalidateIfStale: false, // automatically revalidate even if there is stale data
            revalidateOnFocus: false, // Avoid refetching when window gets focused
            shouldRetryOnError: false, // Retry when fetcher has an error
            revalidateOnReconnect: false, // Avoid refetching on reconnection
        }
    );

    return {
        mutate,
        loading: isLoading,
        list: data?.data?.rows,
    };
};
