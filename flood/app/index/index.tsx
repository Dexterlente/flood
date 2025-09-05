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
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const [value, setValue] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedRegion") || "all";
    }
    return "all";
  });
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
      const saved = localStorage.getItem("selectedRegion");
      if (saved) {
        setValue(saved);
        handleChange(saved, page);
      } else {
      handleChange("all", page); // optional default
    }
  }, [page]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`);
  }, [page, router]);



  const handleChange = async (region: string, page: number = 1) => {
    if (region !== value) setValue(region);
    localStorage.setItem("selectedRegion", region);

    try {
      const res = await axios.get(`/api/region`, { params: { region, page } });
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
  // TODO loader
  return (
    <div className="w-full max-w-7xl mx-auto overflow-hidden py-3">
      <Dropdown handleChange={handleChange} />
      <div className="min-h-screen mt-4">
        <ProjectTable rows={data}/>
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
