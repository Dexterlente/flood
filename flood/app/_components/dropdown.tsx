import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regions } from "@/app/_components/enums/regions";

const Dropdown = ({handleChange}: any) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedRegion");
      if (saved) {
        setSelectedValue(saved);
      }
    }
  }, []);
  
  const onChange = (value: string) => {
    setSelectedValue(value);
    handleChange(value);
  };

  return (
     <div> 
        <Select value={selectedValue} onValueChange={onChange}>
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
      </div>
  )
}

export default Dropdown