import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { validationApi } from "../../api/auth";

interface authState {
  isLogin: boolean;
  isLoginError: boolean;
  isModalOpen: boolean;
}

const initialState: authState = {
  isLogin: !!localStorage.getItem("isLogin"),
  isLoginError: false,
  isModalOpen: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      if (validationApi(action.payload)) {
        state.isLogin = true;
        state.isLoginError = false;
        state.isModalOpen = false;
        localStorage.setItem("isLogin", "true");
      } else {
        state.isLogin = false;
        state.isLoginError = true;
      }
    },
    logout(state) {
      state.isLogin = false;
      localStorage.removeItem("isLogin");
    },
    toggleModal(state, action) {
      if (action.payload) state.isModalOpen = true;
      else {
        state.isModalOpen = false;
        state.isLoginError = false;
      }
    },
  },
});

export const { login, logout, toggleModal } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
