import useSWRMutation from "swr/mutation";

import { PostApi } from "@api/api";
import { ChatLink } from "@api/link";
import { handleDefaultError } from "@api/utils";

const errKey = "default_error_message";
const link = `${ChatLink}/files-upload`;

export const useCallAddChatFiles = ({ onError, onSuccess }) => {
    const { data, error, trigger, isMutating } = useSWRMutation(link, PostApi, {
        onSuccess,
        onError: handleDefaultError(errKey, onError),
    });

    return {
        error,
        data: data?.data,
        loading: isMutating,
        callAddChatFiles: trigger,
    };
};
