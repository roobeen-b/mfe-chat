import useSWRInfinite from "swr/infinite";

import { GetApi } from "../../api";
import { ChatLink } from "../../link";
import { handleDefaultError } from "../../utils";
import { objectToParams } from "../../../utils/parseObjToParams";

const errKey = "fetch_messages_error";
const link = `${ChatLink}/fetch/conversation-list`;

export const useCallInfiniteInquireFetch = (filter) => {
    const { size, mutate, data, error, setSize, isLoading } = useSWRInfinite(
        (i) => `${link}?offset=${i * filter.limit}&${objectToParams(filter)}`,
        (url) => GetApi(url, { arg: { endpoint: "chat" } }),
        { onError: handleDefaultError(errKey) }
    );

    const handleSetSize = () => setSize(size + 1);

    const dLen = data?.length || 0;
    const d0 = data?.[0]?.data?.rows || [];
    const count = data?.[0]?.data?.count || 0;
    const dl = data?.[dLen - 1]?.data?.rows || [];

    const isEmpty = d0?.length === 0;
    const list = data?.map((i) => [...(i?.data?.rows || [])])?.flat() || [];
    const isReachingEnd =
        isEmpty || dl?.length < filter.limit || list.length === count;
    const hadDataLoaded =
        size > 0 && data && typeof data[size - 1] === "undefined";
    const isLoadingMore = isLoading || hadDataLoaded;
    //   const isRefreshing = isValidating && data && data.length === size;

    return {
        list,
        count,
        error,
        mutate,
        isReachingEnd,
        loading: isLoadingMore,
        setSize: handleSetSize,
    };
};
