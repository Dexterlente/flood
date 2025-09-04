import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regions } from "@/app/_components/enums/regions";

const Dropdown = ({handleChange}: any) => {
  return (
     <div> 
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
      </div>
  )
}

export default Dropdown