import useSWRMutation from "swr/mutation";

import { PostApi } from "@api/api";
import { ChatLink } from "@api/link";
import { handleDefaultError } from "@api/utils";

const errKey = "default_error_message";

const link = `${ChatLink}/search/conversation`;
export const useCallGetParticipatedChat = () => {
    const { data, error, trigger, isMutating } = useSWRMutation(link, PostApi, {
        onError: handleDefaultError(errKey),
    });

    return {
        error,
        loading: isMutating,
        data: data?.data?.rows,
        callGetParticipatedChat: trigger,
    };
};
