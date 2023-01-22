import { configureStore } from "@reduxjs/toolkit";
import { newsReducer } from "./slices/newsSlice";
import { notificationReducer } from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    notification: notificationReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
