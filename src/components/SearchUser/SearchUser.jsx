import { useIntl } from "react-intl";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";

import { SearchUserWrapper } from "./SearchUserWrapper";
import { RenderSearchUserOption } from "./RenderSearchUserOption";
import { AutocompleteField } from "@components/bits/AutocompleteField/AutocompleteField";

import { userSelector } from "@store/authSlice/selectors";
import { loadSearchUsersOpts } from "@api/asyncSelectLoad/loadSearchUsersOpts";

export const SearchUser = (props) => {
    const {
        show,
        onSelect,
        redirect,
        checkbox,
        className,
        actionItems,
        hideUsers = [],
        isOpen = undefined,
        allowMultiple = false,
        label = "global_search_placeholder",
    } = props;

    const { formatMessage } = useIntl();
    const user = useSelector(userSelector);

    const loadOptions = async (v) => await loadSearchUsersOpts(v);

    const getOptionLabel = (o) =>
        typeof o === "string" ? o : o?.name || o?.username || o?.email || "-";

    const handleOnChange = (v) => onSelect?.(v);

    return (
        <SearchUserWrapper className={`sw ${className}`}>
            <AutocompleteField
                show={show}
                open={isOpen}
                disablePortal
                disableClearable
                disableCloseOnSelect
                preloadedOptions={[]}
                multiple={allowMultiple}
                loadOptions={loadOptions}
                handleChange={handleOnChange}
                startAdornment={<SearchIcon />}
                getOptionLabel={getOptionLabel}
                className="sw-autocomplete-field"
                renderOption={(p, o) => {
                    if (user?.email === o.email) return null;
                    if (hideUsers.length > 0 && hideUsers.includes(o.email))
                        return null;
                    return (
                        <RenderSearchUserOption
                            option={o}
                            optionProps={p}
                            checkbox={checkbox}
                            redirect={redirect}
                            key={p.key + o.email}
                            actionItem={actionItems}
                        />
                    );
                }}
                isOptionEqualToValue={(option, value) =>
                    option.email === value.email
                }
                slotProps={{
                    popper: { className: "sw-autocomplete-field-popper" },
                    listbox: {
                        className: "sw-autocomplete-field-listbox c-scrollbar",
                    },
                    paper: {
                        className: "sw-autocomplete-field-paper",
                        sx: { minWidth: 200, marginTop: "0.5rem" },
                    },
                }}
                textFieldProps={{
                    size: "small",
                    label: undefined,
                    placeholder: formatMessage({ id: label }),
                    className: "sw-autocomplete-field-input",
                }}
            />
        </SearchUserWrapper>
    );
};
