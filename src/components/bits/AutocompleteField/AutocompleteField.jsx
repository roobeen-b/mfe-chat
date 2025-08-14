import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState, useCallback } from "react";

import { InputField } from "../InputField";
import { SelectedUsers } from "./SelectedUsers";
import { debounceFunction } from "@utils/debounceFunction";

export const AutocompleteField = ({
    show,
    loadOptions,
    endAdornment,
    handleChange,
    error = false,
    startAdornment,
    textFieldProps,
    helperText = "",
    debounceDelay = 300,
    preloadedOptions = [],
    ...autocompleteProps
}) => {
    const { multiple, freeSolo } = autocompleteProps;

    const [loading, setLoading] = useState(false);
    const [loadError, setLoadError] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [options, setOptions] = useState(preloadedOptions);
    const [selectedValues, setSelectedValues] = useState(multiple ? [] : null);

    const fetchOptions = useCallback(
        debounceFunction(async (query) => {
            if (loadOptions) {
                setLoading(true);
                try {
                    const newOptions = await loadOptions(query);
                    setOptions(newOptions);
                    setLoadError(false);
                } catch {
                    setLoadError(true);
                } finally {
                    setLoading(false);
                }
            }
        }, debounceDelay),
        [debounceDelay]
    );

    useEffect(() => {
        if (loadOptions && preloadedOptions.length === 0) {
            fetchOptions(inputValue);
        }
    }, [inputValue]);

    const handleCreateOption = (newOption) => {
        if (!options.includes(newOption)) {
            setOptions((prev) => [...prev, newOption]);
        }
    };

    const handleInputChange = (_, value, __) => {
        setInputValue(value);
    };

    const handleOnChange = (_, value, __, ___) => {
        if (typeof value === "string" && freeSolo) {
            handleCreateOption(value);
        }
        handleChange?.(value);
        setSelectedValues(value);
    };

    const removeOption = (v) => {
        const n = selectedValues.filter((x) => x.email !== v);
        setSelectedValues(n);
        handleChange?.(n);
    };
    return (
        <>
            {/* {show && multiple && (
        <Box
          sx={{
            gap: "0.5rem",
            minHeight: 40,
            display: "flex",
            flexWrap: "wrap",
            padding: "0.2rem",
            marginBottom: "0.5rem",
            borderRadius: "0.2rem",
            border: "1px solid lightgray",
          }}
        >
          {(selectedValues as T[]).length === 0 && <div></div>}
         
        </Box>
      )} */}
            <Autocomplete
                // freeSolo={creatable}
                // multiple={allowMultiple}

                options={options}
                loading={loading}
                id="auto-complete"
                value={selectedValues}
                inputValue={inputValue}
                onChange={handleOnChange}
                defaultValue={multiple ? [] : ""}
                onInputChange={handleInputChange}
                renderInput={({
                    InputLabelProps,
                    InputProps,
                    inputProps,
                    ...rest
                }) => {
                    return (
                        <InputField
                            error={error || loadError}
                            helperText={
                                loadError
                                    ? "Failed to load options"
                                    : helperText
                            }
                            slotProps={{
                                htmlInput: { ...inputProps },
                                inputLabel: { ...InputLabelProps },
                                input: {
                                    ...InputProps,
                                    startAdornment:
                                        startAdornment ||
                                        InputProps.startAdornment,
                                    endAdornment: (
                                        <>
                                            {loading && (
                                                <CircularProgress
                                                    color="inherit"
                                                    size={20}
                                                />
                                            )}
                                            {endAdornment ||
                                                InputProps.endAdornment}
                                        </>
                                    ),
                                },
                            }}
                            {...rest}
                            {...textFieldProps}
                        />
                    );
                }}
                {...autocompleteProps}
            />
            {show === "user" && (
                <SelectedUsers
                    removeOption={removeOption}
                    users={selectedValues}
                />
            )}
        </>
    );
};

//
// // ExampleCreatableOnly.tsx
// import SearchIcon from "@mui/icons-material/Search";

// const preloadedOptions = ["Option 1", "Option 2", "Option 3"];

// const ExampleCreatableOnly = () => {
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

//   return (
//     <AutocompleteField
//       label="Creatable"
//       placeholder="Type to add custom values..."
//       preloadedOptions={preloadedOptions}
//       multiple
//       freeSolo
//       startAdornment={<SearchIcon />}
//       value={selectedOptions}
//       onChange={(_, newValue) => setSelectedOptions(newValue as string[])}
//     />
//   );
// };

// // ExampleCreatableWithAsync.tsx
// import ClearIcon from "@mui/icons-material/Clear";

// const loadOptions = async (input) => {
//   return new Promise<string[]>((resolve) =>
//     setTimeout(() => resolve([`Result for "${input}"`, `Another match for "${input}"`]), 1000)
//   );
// };

// const ExampleCreatableWithAsync = () => {
//   const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

//   return (
//     <AutocompleteField
//       label="Creatable with Async Search"
//       placeholder="Start typing..."
//       loadOptions={loadOptions}
//       startAdornment={<SearchIcon />}
//       endAdornment={<ClearIcon />}
//       allowMultiple
//       creatable
//       value={selectedOptions}
//       onChange={(event, newValue) => setSelectedOptions(newValue as string[])}
//     />
//   );
// };
