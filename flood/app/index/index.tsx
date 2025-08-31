"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const Index: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    axios.get("/api/all?page=1").then((res) => {
      const data = res.data;

      // Flatten all rows from all tables into a single array of objects
      const allRows = Object.values(data).flatMap((tableData: any) => tableData.rows || []);
      setRows(allRows);
    });
  }, []);

  if (!rows.length) return <div>Loading...</div>;

  return (
    <table border={1} cellPadding={5}>
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Project Location</th>
          <th>Project Cost (PHP)</th>
          <th>Start Date/Completion Date </th>
          <th>Project Status</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
           <tr key={index}>
            <td className="px-2 py-1">{row["Project Name"]}</td>
            <td className="px-2 py-1">{row["Project Location"]}</td>
            <td className="px-2 py-1">{row["Project Cost (PHP)"]}</td>
            <td className="px-2 py-1 flex flex-col gap-1">
              <span>{row["Start Date"]}</span>
               {row["Completion Date"] !== "Not Available" && (
                <span>{row["Completion Date"]}</span>
              )}
            </td>
            <td className="px-2 py-1">{row["Project Status"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Index;
