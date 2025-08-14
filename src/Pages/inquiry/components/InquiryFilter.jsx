import { useIntl } from "react-intl";
import { Badge } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { ButtonComp } from "@components/bits/Button";
import { InputField } from "@components/bits/InputField";
import { CreateGroupChat } from "./CreateGroupChat/CreateGroupChat";

const FILTER = [
    { value: "user", label: "other" },
    { value: "platform", label: "platform" },
];

export const InquiryFilter = (props) => {
    const { filter, changeFilter } = props;
    const { formatMessage } = useIntl();

    const badgeValues = { user: 10, platform: 0 };
    const getBadgeValue = (id) => {
        return badgeValues[id] || undefined;
    };

    return (
        <div className="ipw-filter">
            <InputField
                size="small"
                variant="outlined"
                value={filter.search_query}
                className="ipw-filter-input"
                startAdornment={<SearchIcon fontSize="small" />}
                label={formatMessage({ id: "search_inquiry_messages" })}
                placeholder={formatMessage({ id: "search_inquiry_messages" })}
                onChange={(e) => changeFilter(e.target?.value, "search_query")}
            />

            {FILTER.map((i) => {
                const isActive = filter.inquiry_filter === i?.value;
                return (
                    <Badge
                        key={i?.value}
                        color="secondary"
                        data-value={i?.value}
                        className="ipw-filter-badge"
                        badgeContent={getBadgeValue(i?.value)}
                    >
                        <ButtonComp
                            disableElevation
                            className="ipw-filter-badge-item"
                            color={isActive ? "primary" : "inherit"}
                            variant={isActive ? "contained" : "outlined"}
                            onClick={() =>
                                changeFilter(i?.value, "inquiry_filter")
                            }
                        >
                            {formatMessage({ id: i.label })}
                        </ButtonComp>
                    </Badge>
                );
            })}

            <CreateGroupChat />
        </div>
    );
};
