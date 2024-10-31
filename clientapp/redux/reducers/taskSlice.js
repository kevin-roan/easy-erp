import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// async thunk for fetching tasks from the api
export const fetchTasksAll = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await axios.get("http://192.168.0.198:8000/api/v1/tasks");

  // store tasks to asyncstorage for offline use.
  await AsyncStorage.setItem("@tasks", JSON.stringify(response.data.result));
  return response.data.result; // returns the tasks data
});

// async thunk for updating the tasks

export const updateTaskById = createAsyncThunk(
  "tasks/updateTask",
  async (taskId) => {
    await axios
      .patch(`http://192.168.0.198:8000/api/v1/tasks/${taskId}`, {
        isAccepted: true,
      })
      .then((response) => {
        console.log("FOOO", response.data);
        if (response.status) {
          return response.data;
        }
      })
      .catch((error) => console.log("error", error));
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
