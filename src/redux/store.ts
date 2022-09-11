import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchReducer from "./slice/searchSlice";
import loginReducer from "./slice/loginSlice";
import bookmarkReducer from "./slice/bookmarkSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    login: loginReducer,
    bookmark: bookmarkReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
