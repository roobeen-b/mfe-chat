import useSWR from "swr";

import { GetApi } from "@api/api";
import { StorageLink } from "@api/link";
// import { handleDefaultError } from "@api/utils";
import { TFetchStorageInfo } from "@api/_interface/TStorage";

const link = (g) => `${StorageLink}/info${g ? `-for-platform/${g}` : ""}`;
// const ERROR_KEY = "default_error_message";

export const useFetchStorageInfo = ({ platformId }) => {
    const { mutate, error, data, isLoading } = useSWR(
        `${link(platformId)}`,
        (url) => GetApi(url, { arg: { endpoint: "main" } }),
        {
            // onError: handleDefaultError(ERROR_KEY),
        }
    );

    return {
        error,
        mutate,
        data: data?.data,
        loading: isLoading,
    };
};
