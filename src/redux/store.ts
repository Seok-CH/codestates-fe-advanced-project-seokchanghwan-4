import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchReducer from "./slice/searchSlice";
import authReducer from "./slice/authSlice";
import bookmarkReducer from "./slice/bookmarkSlice";
import toptrendReducer from "./slice/toptrendSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    bookmark: bookmarkReducer,
    toptrend: toptrendReducer,
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
