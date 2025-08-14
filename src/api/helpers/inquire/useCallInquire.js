import useSWRMutation from "swr/mutation";

import { PostApi } from "../../api";
import { InquiryLink } from "../../link";
import { handleDefaultError } from "../../utils";

const errKey = "default_error_message";

const Link = {
    inquiry: `${InquiryLink}/create`,
};

export const useCallInquire = (type, onSuccess) => {
    const { data, error, trigger, isMutating } = useSWRMutation(
        Link[type],
        PostApi,
        { onSuccess, onError: handleDefaultError(errKey) }
    );

    return {
        data,
        error,
        loading: isMutating,
        callInquire: trigger,
    };
};
