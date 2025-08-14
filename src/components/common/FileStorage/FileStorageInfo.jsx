import { useIntl } from "react-intl";
import { Typography } from "@mui/material";

import { Spinner } from "@components/bits/Spinner";

export const FileStorageInfo = (props) => {
    const { loading, data } = props;
    const { formatMessage } = useIntl();

    if (loading)
        return (
            <Spinner
                style={{ position: "relative", inset: "unset", margin: 0 }}
            />
        );
    else if (data)
        return (
            <Typography variant="h6" color="primary">
                {formatMessage({ id: data?.plan || "free" })}
                &nbsp;
                {formatMessage({ id: "plan" })}
                {data?.used_storage && data?.total_storage && (
                    <Typography component="span" color="textPrimary">
                        {` (${data?.used_storage} / ${data?.total_storage})  `}
                    </Typography>
                )}
            </Typography>
        );
    else return null;
};
