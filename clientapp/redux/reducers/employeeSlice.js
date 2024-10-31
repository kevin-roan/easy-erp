import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserDataFromStorage = createAsyncThunk(
  "users/fetchUserData",
  async () => {
    const response = await AsyncStorage.getItem("@userInfo");
    if (response !== undefined) {
      return response;
    }
    return null; // if no data found
  },
);

export const employeeSlice = createSlice({
  name: "users",
  initialState: {
    value: "none",
    status: "idle",
  },
  reducers: {
    getUserData: (state) => state.value,
    setUserData: (state, action) => (state.value = action.payload),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataFromStorage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDataFromStorage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.value = action.payload;
      })
      .addCase(fetchUserDataFromStorage.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      });
  },
});

export const { getUserData } = employeeSlice.actions;
export default employeeSlice.reducer;

// todo;
// move thunk logics to seperate fdile
