export interface LoginInfo {
  id: string;
  password: string;
}

export const setAuthData = () => {
  if (!localStorage.getItem("account")) {
    localStorage.setItem(
      "account",
      JSON.stringify({
        id: `${process.env.REACT_APP_ID}`,
        password: `${process.env.REACT_APP_PASSWORD}`,
      })
    );
  }
};

export const validationApi = (data: LoginInfo) => {
  const { id, password } = JSON.parse(localStorage.getItem("account")!);

  if (id === data.id && password === data.password) return true;
  else return false;
};
