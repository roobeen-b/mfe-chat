import { Pagination } from "@mui/material";
import { PaginationWrapper } from "./PaginationWrapper";
import { PaginationPerPageComp } from "./PaginationPerPageComp";

const PaginationComp = ({
    page,
    setPage,
    perPage,
    className,
    totalCount,
    setPerPage,
}) => {
    return (
        <PaginationWrapper
            className={`pw ${className}`}
            setPerPage={Boolean(setPerPage)}
        >
            <Pagination
                color="primary"
                page={page + 1}
                count={totalCount}
                className="pw-pagination"
                onChange={(_, value) => setPage(value)}
            />
            {perPage && setPerPage && (
                <PaginationPerPageComp
                    setPage={setPage}
                    perPage={perPage + 5}
                    setPerPage={setPerPage}
                    className="pw-pagination-per-page"
                />
            )}
        </PaginationWrapper>
    );
};

export { PaginationComp };
