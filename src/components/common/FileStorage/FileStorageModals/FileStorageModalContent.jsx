import { useState } from "react";
import { useIntl } from "react-intl";

import { Typography } from "@mui/material";

import { ButtonComp } from "@components/bits/Button";
import { EmptyArea } from "@components/bits/EmptyArea";
import { FilesSkeleton } from "@components/bits/Skeleton/FilesSkeleton";
import { PaginationComp } from "@components/bits/Pagination/PaginationComp";

import {
    FileStorageWrapper,
    FileStorageModalContentWrapper,
} from "../FileStorageWrapper";
import { FileList } from "../FileList";
import { FileStorageFilter } from "../FileStorageFilter";

import { TableConfig } from "@config/config";
import { getFileType, SnackBar, useDebounce } from "@utils/index";
import { useFetchFiles } from "@api/helpers/storage/useFetchFiles";

const perPage = TableConfig.defaultPerPage;
const maxFileCount = 5;

const defFilter = {
    offset: 0,
    limit: perPage,
    search_query: "",
    file_type: "all",
    sort_value: "none",
};

export const FileStorageModalContent = (props) => {
    const { onConfirm, storageFiles, setStorageFiles } = props;

    const { formatMessage } = useIntl();

    const [filter, setFilter] = useState(defFilter);
    const debouncedSearchQuery = useDebounce(filter.search_query); // Debounce only the search_query

    // Update debounced filter when debounced search query changes
    const effectiveFilter = {
        ...filter,
        search_query: debouncedSearchQuery, // Use debounced search_query here
    };

    // Fetch storage info and files based on effectiveFilter state
    const {
        list,
        count = 0,
        loading: loadingFiles,
    } = useFetchFiles({
        filter: {
            ...effectiveFilter,
            offset: effectiveFilter.offset * perPage,
            file_type:
                effectiveFilter.file_type === "all"
                    ? undefined
                    : effectiveFilter.file_type,
            sort_value:
                effectiveFilter.sort_value === "none"
                    ? undefined
                    : effectiveFilter.sort_value,
        },
    });

    // Handles filter changes and resets offset for new searches
    const handleChangeFilter = (value, key) => {
        setFilter((prev) => ({
            ...prev,
            offset: key === "search_query" ? 0 : prev.offset, // Reset offset on new search
            [key]: value,
        }));
    };

    const handleSelectFile = (v) => {
        const idx = storageFiles.findIndex((i) => i.id === v.id);
        if (idx !== -1) {
            const n = [...storageFiles];
            n.splice(idx, 1);
            setStorageFiles(n);
            return;
        }

        if (storageFiles.length === maxFileCount) {
            const message = formatMessage(
                { id: "alert_max_x_select" },
                { c: maxFileCount }
            );
            SnackBar({ message, doNotTranslate: true }, "warning");
            return;
        }

        const n = {
            id: v.id,
            url: v.file_url,
            name: v.file_original_name,
            type: v.file_type || getFileType(v.file_url),
        };
        setStorageFiles([...storageFiles, n]);
    };

    const loading = loadingFiles;

    return (
        <FileStorageModalContentWrapper className="fs-mc">
            <FileStorageWrapper className="fsw fsw-modal">
                <FileStorageFilter
                    filter={filter}
                    className="fsw-filter"
                    changeFilter={handleChangeFilter}
                />
                {loadingFiles && <FilesSkeleton size={100} />}
                {list && !loadingFiles && (
                    <FileList
                        list={list}
                        loading={loading}
                        canOnlySelect={true}
                        selectFile={handleSelectFile}
                        className="fsw-list fsw-modal-list"
                        fileId={storageFiles.map((i) => i.id)}
                    />
                )}
                {count === 0 && !loadingFiles && (
                    <EmptyArea className="fsw-empty-area" />
                )}
                {count > perPage && (
                    <PaginationComp
                        perPage={perPage}
                        page={filter.offset}
                        setPerPage={() => {}}
                        className="fsw-pagination"
                        totalCount={Math.ceil(count / perPage)}
                        setPage={(page) =>
                            handleChangeFilter(page - 1, "offset")
                        }
                    />
                )}
            </FileStorageWrapper>
            <div>
                <Typography gutterBottom component="p" variant="caption">
                    <Typography gutterBottom variant="caption" color="primary">
                        {formatMessage(
                            { id: "x_selected" },
                            { c: storageFiles.length }
                        )}{" "}
                        &nbsp;
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="caption"
                        color="secondary"
                    >
                        {formatMessage(
                            { id: "alert_max_x_select" },
                            { c: maxFileCount }
                        )}{" "}
                        &nbsp;
                    </Typography>
                </Typography>
                <div className="fs-mc-btns">
                    <ButtonComp
                        color="primary"
                        disableElevation
                        onClick={onConfirm}
                        variant="contained"
                    >
                        {formatMessage({ id: "confirm_selection" })}
                    </ButtonComp>
                </div>
            </div>
        </FileStorageModalContentWrapper>
    );
};
