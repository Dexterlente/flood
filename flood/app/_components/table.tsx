"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface ProjectTableProps {
  rows: any[];
}

export function ProjectTable({ rows }: ProjectTableProps) {
  const router = useRouter();

  return (
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
        {rows?.map((row, index) => (
          <TableRow
            key={index}
            onClick={() => router.push(`/project/${row["Project Code"]}`)}
            className={`h-[100px] cursor-pointer ${
              index % 2 === 0
                ? "bg-white"
                : "bg-gray-50 hover:bg-gray-200"
            }`}
          >
            <TableCell className="px-4 py-2 whitespace-normal break-words max-w-xs">
              {row["Project Name"]}
            </TableCell>
            <TableCell className="px-4 py-2 whitespace-normal break-words max-w-xs">
              {row["Project Location"]}
            </TableCell>
            <TableCell className="px-4 py-2">
              {row["Project Cost (PHP)"]}
            </TableCell>
            <TableCell className="px-4 py-2 align-middle">
              <div className="flex flex-col gap-1">
                <span>{row["Start Date"]}</span>
                {row["Completion Date"] !== "Not Available" && (
                  <span>{row["Completion Date"]}</span>
                )}
              </div>
            </TableCell>
            <TableCell className="px-4 py-2">{row["Project Status"]}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
