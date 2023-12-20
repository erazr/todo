import { taskModel } from "@/entities/task";

export type Filter = {
  id: number;
  title: string;
  filterStatus: taskModel.FilterStatus;
};

export const filters: Record<number, Filter> = {
  1: {
    id: 1,
    title: "Completed",
    filterStatus: "completed",
  },
  2: {
    id: 2,
    title: "In progress",
    filterStatus: "in-progress",
  },
  3: {
    id: 3,
    title: "Pending",
    filterStatus: "pending",
  },
};

// export const DEFAULT_FILTER = undefined;

export const filtersList = Object.values(filters);

export const getFilterById = (id: number) => filters[id];
