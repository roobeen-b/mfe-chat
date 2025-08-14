import useSWR from "swr";

import { GetApi } from "../../api";
import { ChatLink } from "../../link";
import { handleDefaultError } from "../../utils";
import { objectToParams } from "../../../utils/parseObjToParams";

const errKey = "fetch_messages_error";
const link = `${ChatLink}/fetch/conversation-list`;

export const useCallInquireFetch = (fallbackData, filter) => {
    const { mutate, data, isLoading } = useSWR(
        `${link}?${objectToParams(filter)}`,
        (url) => GetApi(url, { arg: { endpoint: "chat" } }),
        { onError: handleDefaultError(errKey), fallbackData }
    );

    return {
        mutate,
        loading: isLoading,
        list: data?.data?.rows,
        count: parseInt(`${data?.data?.count ?? 0}`),
    };
};
