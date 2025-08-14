import { useIntl } from "react-intl";
import { Typography } from "@mui/material";

import { TableConfig } from "@config/config";
import { SelectField } from "../SelectField";
import { PaginationPerPageWrapper } from "./PaginationWrapper";

const OPT = TableConfig.rowsPerPage;

const PaginationPerPageComp = ({
    setPage,
    className,
    setPerPage,
    perPage = 10,
}) => {
    const { formatMessage } = useIntl();
    const handleOnChange = (event) => {
        setPage(1);
        setPerPage?.(event.target.value);
    };

    return (
        <PaginationPerPageWrapper className={`pp_pw ${className}`}>
            <SelectField
                size="small"
                value={`${perPage}`}
                onChange={handleOnChange}
                className="pp_pw-select"
                options={OPT.map((i) => ({ label: `${i}`, value: `${i}` }))}
            />

            <Typography className="pp_pw-label">
                {formatMessage({ id: "per_page" })}
            </Typography>
        </PaginationPerPageWrapper>
    );
};

export { PaginationPerPageComp };
