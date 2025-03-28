import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
  },
  reducers: {
    // Create a new task
    addTask: (state, action) => {
      const newTask = {
        id: action.payload.id || Date.now().toString(),
        title: action.payload.title.trim(),
        categoryId: action.payload.categoryId || null,
        status: action.payload.status || "pending",
        priority: action.payload.priority || "medium",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      state.tasks.push(newTask);
    },

    // Update an existing task
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // Delete a task
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },

    // Change task status
    changeTaskStatus: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );

      if (index !== -1) {
        state.tasks[index].status = action.payload.status;
        state.tasks[index].updatedAt = new Date().toISOString();
      }
    },
  },
});

export const { addTask, updateTask, deleteTask, changeTaskStatus } =
  taskSlice.actions;

export default taskSlice.reducer;
