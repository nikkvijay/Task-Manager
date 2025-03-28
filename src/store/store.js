import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/taskSlice";
import categoryReducer from "./features/categorySlice";
import { loadState, saveState } from "../hooks/useLocalStorage";

const preloadedState = loadState();

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    categories: categoryReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
