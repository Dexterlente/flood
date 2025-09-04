"use client";

import * as React from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regions } from "@/app/_components/enums/regions";

export default function RegionSelect() {
  const [value, setValue] = React.useState("");
  const [data, setData] = React.useState<any>(null);

  const handleChange = async (region: string) => {
    setValue(region);

    try {
      const res = await axios.get(`/api/region`, {
        params: { region },
      });
      setData(res.data);
    } catch (err) {
      console.error("Error fetching region data:", err);
    }
  };

  return (
    <div className="w-64">
      <Select onValueChange={handleChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a region" />
        </SelectTrigger>
        <SelectContent>
          {regions.map((region, idx) => (
            <SelectItem key={idx} value={region.value}>
              {region.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {value && (
        <p className="mt-2 text-sm text-gray-600">
          Selected: <span className="font-medium">{value}</span>
        </p>
      )}

      {data && (
        <pre className="mt-2 p-2 text-sm rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
