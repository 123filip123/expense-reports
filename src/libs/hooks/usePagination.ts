import { useState } from "react";
import { ITEMS_PER_PAGE } from "../constants";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return {
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage,
    setTotalCount,
    setCurrentPage,
  };
};
