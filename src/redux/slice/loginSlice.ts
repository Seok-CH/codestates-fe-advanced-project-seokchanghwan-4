import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loginApi } from "../../api/login";

export interface LoginState {
  isLogin: boolean;
  isLoginError: boolean;
  isModalOpen: boolean;
}

const initialState: LoginState = {
  isLogin: false,
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
      } else {
        state.isLogin = false;
        state.isLoginError = true;
      }
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

export const { login, toggleModal } = loginSlice.actions;

export const selectLogin = (state: RootState) => state.login;

export default loginSlice.reducer;
