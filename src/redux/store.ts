import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchReducer from "./slice/searchSlice";
import loginReducer from "./slice/loginSlice";
import bookmarkReducer from "./slice/bookmarkSlice";
import toptrendReducer from "./slice/toptrendSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    login: loginReducer,
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
