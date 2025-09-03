"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from 'next/navigation'
import { ProjectTable } from "../_components/table";
import Pagination from "../_components/pagination";

const Index: React.FC = () => {
  const searchParams = useSearchParams();

  const [page, setPage] = useState<number>(
    Number(searchParams.get("page")) || 1
  );
  const [rows, setRows] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

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
    fetchData(page);
  }, [page]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  }, [page, router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden py-3 min-h-screen">
      <ProjectTable rows={rows} />
      
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
};

export default Index;
