import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getToptrendArticlesApi } from "../../api/toptrend";
import { ToptrendQueryList, SearchResultList } from "../../types/search";

export interface ToptrendState {
  list: SearchResultList[];
  query: ToptrendQueryList;
  status: "idle" | "loading" | "failed";
}

const initialState: ToptrendState = {
  list: [],
  query: { pageSize: 12, page: 1, category: "general" },
  status: "idle",
};

export const getToptrendArticles = createAsyncThunk(
  "toptrend/getToptrendArticles",
  async (query: ToptrendQueryList) => {
    const response = await getToptrendArticlesApi(query);
    return response.data;
  }
);

export const toptrendSlice = createSlice({
  name: "toptrend",
  initialState,
  reducers: {
    increaseToptrendPage(state) {
      state.query.page += 1;
    },
    changeCategory(state, action) {
      state.list = [];
      state.query.page = 1;
      state.query.category = action.payload;
    },
    resetList(state) {
      state.list = [];
      state.query.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToptrendArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getToptrendArticles.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = state.list.concat(action.payload.articles);
      })
      .addCase(getToptrendArticles.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { increaseToptrendPage, changeCategory, resetList } =
  toptrendSlice.actions;

export const selectToptrend = (state: RootState) => state.toptrend;

export default toptrendSlice.reducer;
