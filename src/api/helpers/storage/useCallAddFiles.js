import useSWRMutation from "swr/mutation";

import { PostApi } from "@api/api";
import { StorageLink } from "@api/link";
import { handleDefaultError } from "@api/utils";

const errKey = "default_error_message";
const link = (v) => `${StorageLink}/${v ? `add-to-platform/${v}` : "add"}`;

export const useCallAddFiles = ({ platformId, onSuccess }) => {
    const { data, error, trigger, isMutating } = useSWRMutation(
        link(platformId),
        PostApi,
        { onSuccess, onError: handleDefaultError(errKey) }
    );

    return {
        data,
        error,
        loading: isMutating,
        callAddFiles: trigger,
    };
};
