"use client";

import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  maxButtons?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  maxButtons = 5,
  onPageChange,
}: PaginationProps) {
  let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
  let endPage = startPage + maxButtons - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  const pageButtons: React.ReactNode[] = [];

  if (startPage > 1) {
    pageButtons.push(
      <button
        key={1}
        className="px-3 py-1 rounded border bg-gray-200 text-gray-700 hover:bg-gray-300"
        onClick={() => onPageChange(1)}
      >
        1
      </button>
    );
    if (startPage > 2) pageButtons.push(<span key="start-ellipsis">...</span>);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageButtons.push(
      <button
        key={i}
        className={`px-3 py-1 rounded border ${
          page === i
            ? "bg-gray-500 text-white"
            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) pageButtons.push(<span key="end-ellipsis">...</span>);
    pageButtons.push(
      <button
        key={totalPages}
        className="px-3 py-1 rounded border bg-gray-200 text-gray-700 hover:bg-gray-300"
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </button>
    );
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        className="px-3 py-1 rounded border bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        &lt;
      </button>

      {pageButtons}

      <button
        className="px-3 py-1 rounded border bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
