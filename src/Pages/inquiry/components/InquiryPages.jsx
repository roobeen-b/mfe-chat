import { useState } from "react";
import { useIntl } from "react-intl";
import { Typography } from "@mui/material";

import { InquireList } from "./InquireList";
import { InquiryFilter } from "./InquiryFilter";
import { EmptyArea } from "@components/bits/EmptyArea";
import { InquiryPageWrapper } from "./InquiryPageWrapper";
import { TableSkeleton } from "@components/bits/Skeleton/TableSkeleton";
import { PaginationComp } from "@components/bits/Pagination/PaginationComp";

import { useDebounce } from "@utils/index";
import { TableConfig } from "@config/config";
import { useCallInquireFetch } from "@api/helpers/inquire/useCallInquireFetch";

const perPage = TableConfig.defaultPerPage;

const defFilter = {
  offset: 0,
  limit: perPage,
  search_query: "",
  inquiry_filter: "user",
};

export const InquiryPages = (props) => {
  const { list: fallbackData } = props;

  const { formatMessage } = useIntl();

  const [filter, setFilter] = useState(defFilter);
  const debouncedSearchQuery = useDebounce(filter.search_query); // Debounce only the search_query

  // Update debounced filter when debounced search query changes
  const effectiveFilter = {
    ...filter,
    search_query: debouncedSearchQuery, // Use debounced search_query here
  };

  const {
    list,
    count = 0,
    // mutate,
    loading,
  } = useCallInquireFetch(fallbackData, {
    ...effectiveFilter,
    offset: effectiveFilter.offset * effectiveFilter.limit,
  });

  const handleChangeFilter = (value, key) => {
    setFilter((prev) => ({
      ...prev,
      offset: key === "search_query" ? 0 : prev.offset, // Reset offset on new search
      [key]: value,
    }));
  };

  return (
    <InquiryPageWrapper className="ipw">
      <Typography
        variant="h5"
        gutterBottom
        component="h1"
        color="secondary"
        className="ipw-header"
      >
        <u>{formatMessage({ id: "inquiry" })}</u>
      </Typography>

      <InquiryFilter
        filter={filter}
        className="ipw-filter"
        changeFilter={handleChangeFilter}
      />

      <InquireList list={list} loading={loading} />
      {loading && <TableSkeleton className="fsw-skeleton" row={8} col={4} />}
      {count === 0 && !loading && <EmptyArea className="ipw-empty-area" />}
      {count > effectiveFilter.limit && (
        <PaginationComp
          page={filter.offset}
          className="fsw-pagination"
          perPage={effectiveFilter.limit}
          totalCount={Math.ceil(count / effectiveFilter.limit)}
          setPage={(page) => handleChangeFilter(page - 1, "offset")}
          setPerPage={(perPage) => handleChangeFilter(perPage, "limit")}
        />
      )}
    </InquiryPageWrapper>
  );
};
