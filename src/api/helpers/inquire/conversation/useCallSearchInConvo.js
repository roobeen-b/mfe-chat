import useSWR from "swr";

import { GetApi } from "@api/api";
import { ChatLink } from "@api/link";
import { handleDefaultError } from "@api/utils";
import { objectToParams } from "../../../../utils/parseObjToParams";

const errKey = "fetch_messages_error";
const link = `${ChatLink}/search/messages/`;

export const useCallSearchInConvo = (filter) => {
    const { mutate, data, isLoading } = useSWR(
        `${link}${filter.id}?${objectToParams(filter)}`,
        (url) =>
            GetApi(url, {
                arg: { endpoint: "chat" },
            }),
        { onError: handleDefaultError(errKey) }
    );

    return {
        mutate,
        loading: isLoading,
        list: data?.data?.rows,
        count: parseInt(`${data?.data?.count ?? 0}`),
    };
};
