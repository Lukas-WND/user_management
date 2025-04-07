import { ColumnFilter } from "@tanstack/react-table";
import { create } from "zustand";

type userFilterStore = {
  filters: ColumnFilter[];
  addFilter: (data: ColumnFilter) => void;
  removeFilter: (id: string) => void;
};

export const useUserFilterStore = create<userFilterStore>((set) => ({
  filters: [],
  addFilter: (data) => {
    set((state) => ({ filters: [...state.filters, data] }));
  },
  removeFilter: (id) => {
    set((state) => ({
      filters: state.filters.filter((item) => item.id !== id),
    }));
  },
}));
