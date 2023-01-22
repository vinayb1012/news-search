import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  messageType: "success" | "error" | "info" | "warning";
  message: string;
  open: boolean;
};

const initialState: InitialState = {
  messageType: "success",
  message: "",
  open: false,
};
const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    showNotification: (state, action) => {
      state.messageType = action.payload.messageType;
      state.message = action.payload.message;
      state.open = true;
    },
    closeNotification: (state) => {
      state.open = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase("news/fetchNews/rejected", (state, action) => {
      state.messageType = "error";
      state.message = "News could not be fetched";
      state.open = true;
    });

    builder.addCase("news/fetchNews/fulfilled", (state, action) => {
      state.messageType = "info";
      // @ts-ignore
      state.message = `${action.payload.length} articles fetched`;
      state.open = true;
    });

    builder.addCase("news/addFavorite", (state, action) => {
      state.messageType = "success";
      state.message = "Article bookmarked";
      state.open = true;
    });

    builder.addCase("news/removeFavorite", (state, action) => {
      state.messageType = "success";
      state.message = "Article removed from bookmarks";
      state.open = true;
    });
  },
});

export const notificationReducer = notificationSlice.reducer;
export const { showNotification, closeNotification } =
  notificationSlice.actions;
