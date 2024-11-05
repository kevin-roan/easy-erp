import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../reducers/taskSlice.js";
import employeeReducer from "../reducers/employeeSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Persist configuration
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

// Create persisted reducer for tasks
const persistedTasksReducer = persistReducer(persistConfig, tasksReducer);

// Configure store
export const store = configureStore({
  reducer: {
    tasks: persistedTasksReducer,
    employee: employeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore specific actions that are not serializable
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        // Optionally, ignore specific state paths that might contain non-serializable values
        ignoredPaths: ["tasks.someNonSerializableField"], // Adjust this based on your actual state structure
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
