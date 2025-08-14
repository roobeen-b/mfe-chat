import useSWR from "swr";

import { GetApi } from "@api/api";
import { StorageLink } from "@api/link";
import { handleDefaultError } from "@api/utils";
import { objectToParams } from "@utils/parseObjToParams";

const link = (g) => `${StorageLink}/${g ? `platform-files/${g}` : "files"}`;
const ERROR_KEY = "default_error_message";

export const useFetchFiles = ({ filter, platformId, files }) => {
    const { mutate, error, data, isLoading } = useSWR(
        `${link(platformId)}?${objectToParams(filter)}`,
        (url) => GetApi(url, { arg: { endpoint: "main" } }),
        {
            fallbackData: files,
            onError: handleDefaultError(ERROR_KEY),
        }
    );

    return {
        error,
        mutate,
        loading: isLoading,
        list: data?.data?.rows,
        count: data?.data?.count,
    };
};
