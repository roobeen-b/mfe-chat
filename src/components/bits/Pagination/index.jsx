import clsx from "clsx";
import { DOTS, usePagination } from "./usePagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export const Pagination = ({
    className,
    totalCount,
    limit = 10,
    currentPage,
    onPageChange,
    siblingCount = 1,
}) => {
    const paginationRange =
        usePagination({
            totalCount,
            currentPage,
            siblingCount,
            pageSize: limit,
        }) || [];

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={clsx(
                "flex gap-2 list-none items-center justify-center pagination-container",
                className
            )}
        >
            <li
                className={clsx("pagination-item  p-1 rounded-full", {
                    "text-gray-400 cursor-not-allowed": currentPage === 1,
                    "hover:bg-th-p-m hover:text-white text-th-p cursor-pointer":
                        currentPage !== 1,
                })}
                onClick={onPrevious}
            >
                <ChevronLeftIcon className="arrow left w-4 h-4" />
            </li>
            {paginationRange.map((pageNumber) => {
                if (pageNumber === DOTS) {
                    return (
                        <li
                            key={pageNumber}
                            className="text-th-p pagination-item dots"
                        >
                            &#8230;
                        </li>
                    );
                }

                return (
                    <li
                        key={pageNumber}
                        className={clsx(
                            "pagination-item cursor-pointer px-2 rounded-full",
                            {
                                "hover:bg-th-p-m hover:text-white text-th-p ":
                                    pageNumber !== currentPage,
                                "selected bg-th-p text-white ":
                                    pageNumber === currentPage,
                            }
                        )}
                        onClick={() => onPageChange(pageNumber)}
                    >
                        {pageNumber}
                    </li>
                );
            })}

            <li
                className={clsx("pagination-item p-1 rounded-full", {
                    "text-gray-400 cursor-not-allowed":
                        currentPage === lastPage,
                    "hover:bg-th-p-m hover:text-white text-th-p cursor-pointer":
                        currentPage !== lastPage,
                })}
                onClick={onNext}
            >
                <ChevronRightIcon className="arrow right w-4 h-4" />
            </li>
        </ul>
    );
};
