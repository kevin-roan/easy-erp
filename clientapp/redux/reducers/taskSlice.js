import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// async thunk for fetching tasks from the api
export const fetchTasksAll = createAsyncThunk(
  "tasks/fetchTasks",
  async (workspaceId) => {
    console.log("workspace id", workspaceId);
    const response = await axios.get("http://192.168.0.198:8000/api/v1/tasks", {
      params: {
        workspaceId,
      },
    });
    console.log("Tasks", response.data);

    // store tasks to asyncstorage for offline use.
    // await AsyncStorage.setItem("@tasks", JSON.stringify(response.data.result));
    return response.data.result; // returns the tasks data
  },
);

// async thunk for updating the tasks

export const updateTaskById = createAsyncThunk(
  "tasks/updateTask",
  async (taskId) => {
    try {
      const response = await axios.patch(
        `http://192.168.0.198:8000/api/v1/tasks/${taskId}`,
        {
          isAccepted: true,
        },
      );
      if (response.status === 200) {
        return response.data; // only return serializable response data
      }
    } catch (error) {
      console.error("Error updating task:", error);
      throw error; // re-throw to handle in slice
    }
  },
);

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    value: [""],
    status: "idle", // Can be 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    getTasks: (state) => state.value,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAll.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchTasksAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
// todo;
// move thunk logics to seperate file
