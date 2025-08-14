import { useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Alert, Typography } from "@mui/material";

import { FileList } from "./FileList";
import { FileStorageInfo } from "./FileStorageInfo";
import { EmptyArea } from "@components/bits/EmptyArea";
import { FileStorageFilter } from "./FileStorageFilter";
import { FileStorageWrapper } from "./FileStorageWrapper";
import { FileStorageAddButton } from "./FileStorageAddButton";
import { FilesSkeleton } from "@components/bits/Skeleton/FilesSkeleton";
import { PaginationComp } from "@components/bits/Pagination/PaginationComp";

import { TableConfig } from "@config/config";
import { toggleFileRelatedModal } from "@store/extraSlice";
import { SnackBar, useDebounce, waitMinutes } from "@utils/index";
import { useFetchFiles } from "@api/helpers/storage/useFetchFiles";
import { FileStorageModals } from "./FileStorageModals/FileStorageModals";
import { useFetchStorageInfo } from "@api/noAuth/storage/useFetchStorageInfo";
import { useCallUpdateFileName } from "@api/noAuth/storage/useCallUpdateFileName";
import { Link } from "react-router";

const perPage = TableConfig.defaultPerPage * 2;

const defFilter = {
  offset: 0,
  limit: perPage,
  search_query: "",
  file_type: "all",
  sort_value: "none",
};

export const FileStoragePageComp = (props) => {
  const { files, platform } = props;
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();

  const [filter, setFilter] = useState(defFilter);
  const [fileId, setFileId] = useState([]);
  const debouncedSearchQuery = useDebounce(filter.search_query); // Debounce only the search_query

  // Update debounced filter when debounced search query changes
  const effectiveFilter = {
    ...filter,
    search_query: debouncedSearchQuery, // Use debounced search_query here
  };

  // Fetch storage info and files based on effectiveFilter state
  const {
    data,
    mutate: mutateStorageInfo,
    loading: loadingStorageInfo,
  } = useFetchStorageInfo({});

  const {
    list,
    count = 0,
    mutate: mutateFiles,
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
    files,
  });

  const handleUpdateFileNameSuccess = () => {
    // console.log("ddd");
    // mutateFiles();
    SnackBar({ message: "file_name_updated" }, "success");
  };

  const { loading: reNameLoading, callUpdateFileName } = useCallUpdateFileName({
    fileId: fileId[0],
    platformId: platform?.id,
    onSuccess: handleUpdateFileNameSuccess,
  });

  // Handles filter changes and resets offset for new searches
  const handleChangeFilter = (value, key) => {
    setFilter((prev) => ({
      ...prev,
      offset: key === "search_query" ? 0 : prev.offset, // Reset offset on new search
      [key]: value,
    }));
  };

  // Callback to refresh files and storage info on file addition
  const handleFetchAgain = () => {
    mutateFiles();
    mutateStorageInfo();
  };

  const isAdmin = platform?.role === "admin";
  const storageLink = platform?.id ? `my-platform/${platform?.slug}/` : "";
  const showAddButton = platform?.id ? platform?.role !== null : true;
  const userExceedPlan =
    platform?.id && data?.users ? platform?.total_member > data?.users : false;

  const handleEditFileName = (id, _) => async (name) => {
    setFileId([id]);
    const data = { name };
    await waitMinutes(500);
    callUpdateFileName({ data });
  };

  const handleDeletingFile = (id, n) => {
    if (!id) {
      SnackBar({ message: "error_deleting_file" }, "error");
      return;
    }
    setFileId([id]);
    dispatch(
      toggleFileRelatedModal({
        id,
        name: n,
        platformId: platform?.id,
        mType: "delete",
      })
    );
    // openDeleteModal();
  };

  const loading = loadingStorageInfo || loadingFiles || reNameLoading;

  const handleOnSuccess = (v) => {
    if (v === "delete") handleFetchAgain();
  };
  return (
    <FileStorageWrapper className="fsw">
      <Typography
        variant="h5"
        gutterBottom
        component="h1"
        color="secondary"
        className="fsw-header"
      >
        <u>{formatMessage({ id: "file_storage" })}</u>
        <FileStorageInfo loading={loadingStorageInfo} data={data} />
      </Typography>

      <FileStorageFilter
        filter={filter}
        className="fsw-filter"
        changeFilter={handleChangeFilter}
      />

      {(!platform?.id || isAdmin) && (
        <Link to={`/${storageLink}settings?update=storage`}>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {formatMessage({
              id: "you_can_change_your_storage_plans_from_here",
            })}
          </Typography>
        </Link>
      )}

      {userExceedPlan && (
        <Alert severity="error" className="fsw-alert">
          <Typography variant="body2" color="error">
            {formatMessage({ id: "user_exceed_upgrade_plan" })}
          </Typography>
        </Alert>
      )}

      {showAddButton && !userExceedPlan && (
        <FileStorageAddButton
          className="fsw-choose-file"
          onAddFileSuccess={handleFetchAgain}
        />
      )}

      {loadingFiles && <FilesSkeleton size={200} />}

      {list && !loadingFiles && (
        <FileList
          list={list}
          fileId={fileId}
          loading={loading}
          platform={platform}
          className="fsw-list"
          canOnlySelect={false}
          fileLoading={reNameLoading}
          deleteAFile={handleDeletingFile}
          editFileName={handleEditFileName}
        />
      )}

      {count === 0 && !loadingFiles && <EmptyArea className="fsw-empty-area" />}

      {count > perPage && (
        <PaginationComp
          perPage={perPage}
          page={filter.offset}
          setPerPage={() => {}}
          className="fsw-pagination"
          totalCount={Math.ceil(count / perPage)}
          setPage={(page) => handleChangeFilter(page - 1, "offset")}
        />
      )}

      <FileStorageModals onSuccess={handleOnSuccess} />
    </FileStorageWrapper>
  );
};
