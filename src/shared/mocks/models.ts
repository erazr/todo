export type Task = {
  id: number;
  title: string;
  description: string;
  status: "completed" | "in-progress" | "pending";
};
