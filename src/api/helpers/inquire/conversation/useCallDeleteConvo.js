import useSWRMutation from "swr/mutation";

import { PatchApi } from "@api/api";
import { ChatLink } from "@api/link";
import { handleDefaultError } from "@api/utils";

const errKey = "default_error_message";

const link = `${ChatLink}/delete/conversation/`;
export const useCallDeleteConvo = ({ cId, onSuccess }) => {
    const { error, trigger, isMutating } = useSWRMutation(
        link + cId,
        PatchApi,
        {
            onSuccess,
            onError: handleDefaultError(errKey),
        }
    );

    return {
        error,
        loading: isMutating,
        callDeleteConvo: trigger,
    };
};
