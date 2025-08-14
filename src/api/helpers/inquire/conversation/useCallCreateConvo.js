import useSWRMutation from "swr/mutation";

import { PostApi } from "@api/api";
import { ChatLink } from "@api/link";
import { handleDefaultError } from "@api/utils";

const errKey = "default_error_message";

const Link = `${ChatLink}/create/conversation`;

export const useCallCreateConvo = ({ onSuccess, onError }) => {
    const { data, error, trigger, isMutating } = useSWRMutation(Link, PostApi, {
        onSuccess,
        onError: handleDefaultError(errKey, onError),
    });

    return {
        error,
        data: data?.data,
        loading: isMutating,
        callCreateConvo: trigger,
    };
};
