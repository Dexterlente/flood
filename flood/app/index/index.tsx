"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";

const PAGE_SIZE = 10;
const MAX_BUTTONS = 5;

const Index: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/all?page=${page}&per_page=${PAGE_SIZE}`);
      const data = res.data;

      const allRows = Object.values(data).flatMap((tableData: any) => tableData.rows || []);
      setRows(allRows);

      const firstTable = Object.values(data)[0] as any;
      setTotalPages(firstTable?.total_pages ?? 1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  if (loading) return <div>Loading...</div>;

  // Pagination logic
  let startPage = Math.max(1, page - Math.floor(MAX_BUTTONS / 2));
  let endPage = startPage + MAX_BUTTONS - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - MAX_BUTTONS + 1);
  }

  const pageButtons = [];
  if (startPage > 1) {
    pageButtons.push(
      <button
        key={1}
        className="px-3 py-1 rounded border bg-gray-200 text-gray-700 hover:bg-gray-300"
        onClick={() => setPage(1)}
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
          page === i ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
        }`}
        onClick={() => setPage(i)}
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
        onClick={() => setPage(totalPages)}
      >
        {totalPages}
      </button>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden">
      <Table className="min-w-full border border-gray-200 table-auto">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="px-4 py-2 border-b">Project Name</TableHead>
            <TableHead className="px-4 py-2 border-b">Location</TableHead>
            <TableHead className="px-4 py-2 border-b">Cost (PHP)</TableHead>
            <TableHead className="px-4 py-2 border-b">Dates</TableHead>
            <TableHead className="px-4 py-2 border-b">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-200"}
            >
              <TableCell className="px-4 py-2 truncate max-w-xs">{row["Project Name"]}</TableCell>
              <TableCell className="px-4 py-2 truncate max-w-xs">{row["Project Location"]}</TableCell>
              <TableCell className="px-4 py-2">{row["Project Cost (PHP)"]}</TableCell>
              <TableCell className="px-4 py-2 flex flex-col gap-1">
                <span>{row["Start Date"]}</span>
                {row["Completion Date"] !== "Not Available" && (
                  <span>{row["Completion Date"]}</span>
                )}
              </TableCell>
              <TableCell className="px-4 py-2">{row["Project Status"]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination with Previous/Next */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="px-3 py-1 rounded border bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>

        {pageButtons}

        <button
          className="px-3 py-1 rounded border bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Index;
