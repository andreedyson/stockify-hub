"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";

type Props = {
  onValueChange: (value: string) => void;
};

function TimespanSelect({ onValueChange }: Props) {
  return (
    <Select onValueChange={onValueChange} defaultValue="all">
      <SelectTrigger className="h-10 w-[120px] rounded-sm bg-zinc-700">
        <SelectValue placeholder="Select timespan for transactions data" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="week">Last 7 Days</SelectItem>
        <SelectItem value="month">This Month</SelectItem>
        <SelectItem value="all">All Time</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default TimespanSelect;
