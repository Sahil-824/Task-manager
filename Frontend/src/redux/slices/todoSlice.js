import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import toast from "react-hot-toast";

export const addTodo = createAsyncThunk("/todo/add", async (body) => {
  try {
    const response = await axiosClient.post("/todo/add", body);

    toast.success("ToDo Added");
    return response.result;
  } catch (e) {}
});

export const getTodos = createAsyncThunk("/todo/get", async (body) => {
  try {
    const response = await axiosClient.post("/todo/get", body);

    return response.result;
  } catch (e) {}
});

export const markComplete = createAsyncThunk(
  "/todo/martCompleted",
  async (body) => {
    try {
      const response = await axiosClient.post("/todo/markCompleted", body);
      toast.success(response.result);

      return body;
    } catch (e) {}
  }
);

export const deleteTodo = createAsyncThunk("/todo/", async (body) => {
  try {
    const response = await axiosClient.post("/todo/delete", body);

    toast.success("Deleted Successfully");
    return body;
  } catch (e) {}
});

export const todoUpdate = createAsyncThunk("/todo/update", async (body) => {
  try {
    const response = await axiosClient.post("/todo/updateTodo", body);

    toast.success(response.result);
    return body;
  } catch (e) {}
});

export const getUserInfo = createAsyncThunk("/auth/getUser", async (body) => {
  try {
    const response = await axiosClient.get("/auth/getUser");
    return response.result;
  } catch (e) {}
});

const todoSlice = createSlice({
  name: "todoSlice",

  initialState: {
    todos: [],
    user: {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        const { todoId } = action.payload;

        const index = state.todos?.findIndex((todo) => todo._id === todoId);
        state.todos?.splice(index, 1);
      })
      .addCase(markComplete.fulfilled, (state, action) => {
        const { todoId } = action.payload;

        const index = state.todos?.findIndex((todo) => todo._id === todoId);
        state.todos[index].status = "Completed";
      })
      .addCase(todoUpdate.fulfilled, (state, action) => {
        const { todoId, title, description } = action.payload;

        const index = state.todos?.findIndex((todo) => todo._id === todoId);
        if (title) state.todos[index].title = title;

        if (description) state.todos[index].description = description;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default todoSlice.reducer;
