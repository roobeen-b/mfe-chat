import useSWR from "swr";

import { GetApi } from "@api/api";
import { ChatLink } from "@api/link";
import { handleDefaultError } from "@api/utils";
import { objectToParams } from "../../../../utils/parseObjToParams";

const errKey = "fetch_messages_error";
const link = `${ChatLink}/fetch/conversation-members/`;

export const useCallFetchConvoMembers = (filter) => {
    const { id, ...rest } = filter;

    const { mutate, data, isLoading } = useSWR(
        `${link + id}?${objectToParams(rest)}`,
        (url) => GetApi(url, { arg: { endpoint: "chat" } }),
        {
            onError: handleDefaultError(errKey),
            // dedupingInterval: 5000, // Prevent calling the API again within this interval (60 seconds)
            revalidateOnFocus: false, // Avoid refetching when window gets focused
            revalidateOnReconnect: false, // Avoid refetching on reconnection
        }
    );

    return {
        mutate,
        list: data?.data,
        loading: isLoading,
    };
};
