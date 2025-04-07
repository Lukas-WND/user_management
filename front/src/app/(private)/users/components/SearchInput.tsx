"use client";

import { useEffect, useState } from "react";
import { useUserFilterStore } from "../stores/filter-store";
import { Input } from "@/components/ui/input";

export default function SearchInput() {
  const [input, setInput] = useState("");
  const addFilter = useUserFilterStore((state) => state.addFilter);
  const removeFilter = useUserFilterStore((state) => state.removeFilter);

  useEffect(() => {
    if (input) {
      addFilter({ id: "name", value: input });
    } else {
      removeFilter("name");
    }

    return () => {
      removeFilter("name");
    };
  }, [input, addFilter, removeFilter]);

  return (
    <Input
      className="max-w-[20rem] focus-visible:ring-transparent"
      placeholder="Filtrar usuários..."
      value={input}
      onChange={(e) => {
        setInput(e.target.value);
      }}
    />
  );
}
