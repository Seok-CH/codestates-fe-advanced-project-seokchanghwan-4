import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  getBookmarkApi,
  postBookmarkApi,
  editBookmarkApi,
  delBookmarkApi,
} from "../../api/bookmark";
import { SearchResultList } from "../../types/search";

export interface BookmarkState {
  list: SearchResultList[];
}

const initialState: BookmarkState = {
  list: [],
};

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    getBookmark(state) {
      state.list = getBookmarkApi();
    },
    postBookmark(state, action) {
      if (window.confirm("북마크 하시겠습니까?")) {
        postBookmarkApi(action.payload);
        state.list = getBookmarkApi();
      }
    },
    editBookmark(state, action) {
      editBookmarkApi(action.payload.data, action.payload.bookmarkIdx);
      state.list = getBookmarkApi();
    },
    delBookmark(state, action) {
      if (window.confirm("정말 삭제 하시겠습니까?")) {
        delBookmarkApi(action.payload);
        state.list = getBookmarkApi();
      }
    },
  },
});

export const { getBookmark, postBookmark, editBookmark, delBookmark } =
  bookmarkSlice.actions;

export const selectBookmark = (state: RootState) => state.bookmark;

export default bookmarkSlice.reducer;
