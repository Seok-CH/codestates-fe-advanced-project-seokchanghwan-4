import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { searchArticlesApi, QueryList } from "../../api/search";

export interface SearchListInterface {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface SearchState {
  list: SearchListInterface[];
  query: QueryList;
  status: "idle" | "loading" | "failed";
}

const initialState: SearchState = {
  list: [],
  query: { pageSize: 10, page: 1, sortBy: "relevancy", q: "" },
  status: "idle",
};

export const searchArticles = createAsyncThunk(
  "search/fetchArticles",
  async (query: QueryList) => {
    const response = await searchArticlesApi(query);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    increasePage(state) {
      state.query.page += 1;
    },
    changeSortBy(state, action) {
      state.list = [];
      state.query.page = 1;
      state.query.sortBy = action.payload;
    },
    changeSearchword(state, action) {
      state.list = [];
      state.query = { ...initialState.query, q: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = state.list.concat(action.payload.articles);
      })
      .addCase(searchArticles.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { increasePage, changeSearchword, changeSortBy } =
  searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
