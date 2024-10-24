import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "../reducers/taskSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, tasksReducer);

export const store = configureStore({
  reducer: {
    tasks: persistedReducer,
  },
});

export const persistor = persistStore(store);
