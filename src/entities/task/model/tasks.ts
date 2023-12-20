import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import {
  createAsyncThunk,
  createSelector,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit/react";
import { Task } from "@/shared/mocks/models";

const BASE_URL = window.location.origin;

export type FilterStatus = Task["status"] | undefined;

const initialState: {
  data: Task[];
  completedTasks?: Task[];
  filterStatus: FilterStatus;
} = {
  data: [],
  completedTasks: [],
  filterStatus: undefined,
};

export const taskModel = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setCompletedTasks: (state, { payload }: PayloadAction<Task[]>) => {
      state.data = payload;
    },
    addTask: (state, { payload }: PayloadAction<Task>) => {
      state.data.push({ ...payload });
    },
    setFilterStatus: (state, { payload }: PayloadAction<FilterStatus>) => {
      state.filterStatus = payload;
    },
    editTask: (state, { payload }: PayloadAction<Task>) => {
      const editIndex = state.data.findIndex((t) => t.id === payload.id);
      if (editIndex !== -1) {
        state.data[editIndex] = { ...payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postCompletedTasks.fulfilled, (state, action) => {});
    builder.addCase(postCompletedTasks.rejected, (state, action) => {
      const id = action.meta.arg;
      const task = state.data.find((t) => t.id === id);
      state.completedTasks?.push(task!);

      console.log(
        "Request sent with task ID:",
        id,
        "\nList of completed tasks:",
        current(state.completedTasks)
      );
    });
  },
});

export const getFilteredTasks = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.tasks.filterStatus,
      (state: RootState) => state.tasks.data,
      (
        filterStatus: RootState["tasks"]["filterStatus"],
        tasks: RootState["tasks"]["data"]
      ) =>
        tasks.filter(
          (task) => filterStatus === undefined || task?.status === filterStatus
        )
    )
  );

export const postCompletedTasks = createAsyncThunk(
  "tasks/completedTasks",
  async (id: number, { getState }) => {
    const { tasks }: RootState = getState() as RootState;
    const task = tasks.data.filter((t) => t.id === id);

    const res = await fetch(BASE_URL, {
      method: "post",
      body: JSON.stringify(task),
    });
    const data = await res.json();

    return data;
  }
);

export const { addTask, setFilterStatus, editTask } = taskModel.actions;

export const reducer = taskModel.reducer;
