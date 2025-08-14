import useSWRMutation from "swr/mutation";

import { PatchApi } from "../../api";
import { ChatLink } from "../../link";
import { handleDefaultError } from "../../utils";

const errKey = "default_error_message";
const link = (v) => `${ChatLink}/update/conversation${v ? "-image" : ""}/`;

export const useCallPatchConvo = ({
    id,
    onError,
    onSuccess,
    updateImage = false,
}) => {
    const { data, error, trigger, isMutating } = useSWRMutation(
        link(updateImage) + id,
        PatchApi,
        {
            onSuccess,
            onError: handleDefaultError(errKey, onError),
        }
    );

    return {
        data,
        error,
        loading: isMutating,
        callPatchConvo: trigger,
    };
};
