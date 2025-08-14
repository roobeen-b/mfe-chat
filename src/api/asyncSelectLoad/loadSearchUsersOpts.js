import useSWR from "swr";

import { GetApi } from "../api";
import { UserLink } from "../link";

const errKey = "fetch_messages_error";
const link = (v = "") => `${UserLink}/search/${v}?offset=0&limit=10`;

export const loadSearchUsersOpts = async (v, cb) => {
    try {
        const { data } = useSWR(link(v), (url) =>
            GetApi(
                url,
                { arg: { endpoint: "common" } },
                { onError: handleDefaultError(errKey) }
            )
        );
        const a = data?.data?.rows;
        cb?.(
            a?.map((i) => ({
                label: i.email,
                extra: { ...i },
                value: `${i.id}`,
            }))
        );
        return a;
    } catch (error) {
        console.error({ handleIndTypeLoadOptsErr: error });
        cb?.([]);
        return [];
    }
};
