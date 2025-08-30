"use client";

import React, { useEffect } from "react";
import Papa from "papaparse";
// @ts-ignore – alasql doesn't ship proper types
import alasql from "alasql/dist/alasql.min.js";

// ✅ Define your row shape
type ProjectRow = {
  "Program Name": string;
  "Project Code": string;
  "Project Name": string;
  "Implementing Agency": string;
  "Project Location": string;
  "Contractors": string;
  "Project Status": string;
  "Project Latitude & Longitude": string;
  "Fund Source": string;
  "Project Cost (PHP)": string;
  "Utilized Budget": string;
  "Budget Utilization/Disbursement Rate": string;
  "Start Date": string;
  "Completion Date": string;
};

const Index: React.FC = () => {
  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await fetch("/flood.csv");
        if (!response.ok) throw new Error("Failed to load CSV");

        const text = await response.text();

        Papa.parse<ProjectRow>(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const data = results.data;

            if (!data.length) {
              console.warn("⚠️ No rows found in CSV");
              return;
            }

            // ✅ Query Example 1: Filter by location
            const apayaoProjects = alasql(
              "SELECT * FROM ? WHERE [Project Location] LIKE '%Apayao%'",
              [data]
            );
            console.log("📌 Apayao Projects:", apayaoProjects);

            // ✅ Query Example 2: Group by agency (alias fixed)
            const projectsPerAgency = alasql(
              "SELECT [Implementing Agency], COUNT(*) AS project_count FROM ? GROUP BY [Implementing Agency]",
              [data]
            );
            console.log("📊 Projects per Agency:", projectsPerAgency);

            // ✅ Query Example 3: Top 5 biggest projects
            const topProjects = alasql(
              "SELECT [Project Name], [Project Cost (PHP)] " +
                "FROM ? ORDER BY CAST([Project Cost (PHP)] AS INT) DESC LIMIT 5",
              [data]
            );
            console.log("💰 Top 5 Projects by Cost:", topProjects);
          },
        });
      } catch (error) {
        console.error("❌ Error loading CSV:", error);
      }
    };

    loadCSV();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">CSV SQL Query Playground</h1>
      <p>✅ Open your browser console to see the query results.</p>
    </div>
  );
};

export default Index;
