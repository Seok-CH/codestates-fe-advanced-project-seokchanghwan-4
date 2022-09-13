import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loginApi } from "../../api/login";

interface LoginState {
  isLogin: boolean;
  isLoginError: boolean;
  isModalOpen: boolean;
}

const initialState: LoginState = {
  isLogin: !!localStorage.getItem("isLogin"),
  isLoginError: false,
  isModalOpen: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login(state, action) {
      if (loginApi(action.payload)) {
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

export const { login, logout, toggleModal } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
