"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from 'next/navigation'
import { ProjectTable } from "../_components/table";
import Pagination from "../_components/pagination";
import Dropdown from "../_components/dropdown";

const Index: React.FC = () => {
  const searchParams = useSearchParams();
  const pageFromUrl = Number(searchParams.get("page")) || 1

  const [page, setPage] = useState<number>(pageFromUrl);
  const [rows, setRows] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [value, setValue] = useState("");
  const [data, setData] = useState<any>(null);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/all?page=${page}`);
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
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    fetchData(page);
    // handleChange(value, page);
  }, [page]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  }, [page, router]);



  const handleChange = async (region: string, page: number = 1) => {
    setValue(region);
    console.log("Selected region:", region);
    try {
      const res = await axios.get(`/api/region`, {
        params: { region, page },
      });

      const allRows = res?.data?.rows ?? [];
      setData(allRows);

      const totalPages = res?.data?.total_pages ?? 1; 
      setTotalPages(totalPages);

      setPage(page); 

    } catch (err) {
      console.error("Error fetching region data:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden py-3">
      <Dropdown handleChange={handleChange} />
      <div className="min-h-screen mt-4">
        <ProjectTable rows={rows}/>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default Index;
