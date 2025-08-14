import { useIntl } from "react-intl";
import SearchIcon from "@mui/icons-material/Search";

import { InputField } from "@components/bits/InputField";
import { SelectField } from "@components/bits/SelectField";

const FILE_TYPE = [
    { value: "all", label: "all" },
    { value: "pdf", label: "pdf" },
    { value: "text", label: "text" },
    { value: "word", label: "word" },
    { value: "image", label: "image" },
    { value: "video", label: "video" },
    { value: "audio", label: "audio" },
    { value: "other", label: "other" },
    { value: "spreadsheet", label: "spreadsheet" },
    { value: "presentation", label: "presentation" },
];

const FILE_SORT = [
    { value: "none", label: "none" },
    { value: "0", label: "oldest_to_newest" },
    { value: "1", label: "largest_to_smallest" },
    { value: "-1", label: "smallest_to_largest" },
];

export const FileStorageFilter = (props) => {
    const { filter, changeFilter } = props;
    const { formatMessage } = useIntl();

    return (
        <div className="fsw-filter">
            <InputField
                size="small"
                variant="outlined"
                label={formatMessage({ id: "search" })}
                placeholder={formatMessage({ id: "search" })}
                value={filter.search_query}
                className="fsw-filter-input"
                endAdornment={<SearchIcon fontSize="small" />}
                onChange={(e) => changeFilter(e.target?.value, "search_query")}
            />
            <SelectField
                size="small"
                label={formatMessage({ id: "type" })}
                value={filter.file_type}
                className="fsw-filter-select"
                options={FILE_TYPE.map((i) => ({
                    ...i,
                    label: formatMessage({ id: i.label }),
                }))}
                onChange={(e) => changeFilter(e?.target?.value, "file_type")}
            />
            <SelectField
                size="small"
                label={formatMessage({ id: "sort" })}
                value={filter.sort_value}
                className="fsw-filter-select"
                options={FILE_SORT.map((i) => ({
                    ...i,
                    label: formatMessage({ id: i.label }),
                }))}
                onChange={(e) => changeFilter(e?.target?.value, "sort_value")}
            />
        </div>
    );
};
