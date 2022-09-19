import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { searchArticlesApi } from "../../api/search";
import { SearchQueryList, SearchResultList } from "../../types/search";

export interface SearchState {
  noContents: boolean;
  list: SearchResultList[];
  query: SearchQueryList;
  status: "idle" | "loading" | "failed";
}

const initialState: SearchState = {
  noContents: false,
  list: [],
  query: { pageSize: 10, page: 1, sortBy: "relevancy", q: "" },
  status: "idle",
};

export const searchArticles = createAsyncThunk(
  "search/fetchArticles",
  async (query: SearchQueryList) => {
    const response = await searchArticlesApi(query);
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    increaseSearchPage(state) {
      state.query.page += 1;
    },
    changeSortBy(state, action) {
      state.noContents = false;
      state.list = [];
      state.query.page = 1;
      state.query.sortBy = action.payload;
    },
    changeSearchword(state, action) {
      state.noContents = false;
      state.list = [];
      state.query = { ...initialState.query, q: action.payload };
    },
    resetList(state) {
      state.noContents = false;
      state.list = [];
      state.query.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.totalResults === 0) {
          state.noContents = true;
        } else {
          state.list = state.list.concat(action.payload.articles);
        }
      })
      .addCase(searchArticles.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { increaseSearchPage, changeSearchword, changeSortBy, resetList } =
  searchSlice.actions;

export const selectSearch = (state: RootState) => state.search;

export default searchSlice.reducer;
