"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type ProjectData = {
  [key: string]: string | number;
};

export default function Page() {
  const { id } = useParams<{ id: string }>(); // ✅ get the param properly
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`/api/project?project_code=${id}`);
        setProject(res.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading project data...</p>;
  }

  if (!project) {
    return (
      <p className="text-center mt-10">
        No project found for ID {id}.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <Card className="shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {project["Project Name"]}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700">
          <p><strong>Project Code:</strong> {project["Project Code"]}</p>
          <p><strong>Program Name:</strong> {project["Program Name"]}</p>
          <p><strong>Implementing Agency:</strong> {project["Implementing Agency"]}</p>
          <p><strong>Fund Source:</strong> {project["Fund Source"]}</p>
          <p><strong>Project Cost:</strong> {project["Project Cost (PHP)"]}</p>
          <p><strong>Utilized Budget:</strong> {project["Utilized Budget"]}</p>
          <p><strong>Status:</strong> {project["Project Status"]}</p>
          <p><strong>Start Date:</strong> {project["Start Date"]}</p>
          <p><strong>Completion Date:</strong> {project["Completion Date"]}</p>
          <p><strong>Budget Utilization Rate:</strong> {project["Budget Utilization/Disbursement Rate"]}</p>
          <p><strong>Contractors:</strong> {project["Contractors"]}</p>
          <p><strong>Location:</strong> {project["Project Location"]}</p>
          <p><strong>Coordinates:</strong> {project["Project Latitude & Longitude"]}</p>
        </CardContent>
      </Card>
    </div>
  );
}
