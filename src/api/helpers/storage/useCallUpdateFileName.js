import useSWRMutation from "swr/mutation";

import { PatchApi } from "@api/api";
import { StorageLink } from "@api/link";
import { handleDefaultError } from "@api/utils";

const errKey = "default_error_message";
const link = (f, g) =>
    `${StorageLink}/${g ? `file-from-platform/${f}/${g}` : `file/${f}`}`;

export const useCallUpdateFileName = ({ fileId, platformId, onSuccess }) => {
    const { data, error, trigger, isMutating } = useSWRMutation(
        fileId ? link(fileId, platformId) : null,
        PatchApi,
        { onSuccess, onError: handleDefaultError(errKey) }
    );

    return {
        data,
        error,
        loading: isMutating,
        callUpdateFileName: trigger,
    };
};
