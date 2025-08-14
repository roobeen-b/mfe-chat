import { useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "@mui/material";

import { Spinner } from "@components/bits/Spinner";
import { useCallFetchEditHistory } from "@api/helpers/inquire/conversation/useCallFetchEditHistory";

const def = [{ message: "err" }];

export const EditMessageHistory = (props) => {
    const { className, id, cId } = props;
    const { formatMessage } = useIntl();

    const [showHistory, setShowHistory] = useState(false);
    const { loading, list = def } = useCallFetchEditHistory({
        id: showHistory ? id : undefined,
        cId,
    });

    const toggleEditHistory = () => setShowHistory((o) => !o);

    return (
        <>
            <Typography
                component="div"
                color="primary"
                variant="caption"
                className={className}
                onClick={toggleEditHistory}
            >
                {formatMessage({ id: showHistory ? "hide" : "edited" })}
            </Typography>
            {loading && (
                <div>
                    <Spinner absolute={false} size={10} />
                </div>
            )}
            {!loading && list.length > 0 && showHistory && (
                <ul className="csw-cs-sm-isEdited-ul">
                    {list.map((i, j) => (
                        <Typography
                            component="li"
                            variant="caption"
                            key={`edit-${j + 1}`}
                            color="textSecondary"
                        >
                            <div className="csw-cs-sm-isEdited-ul-li-msg">
                                {i.message}
                            </div>
                        </Typography>
                    ))}
                </ul>
            )}
        </>
    );
};
