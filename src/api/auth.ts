export interface LoginInfo {
  id: string;
  password: string;
}

export const validationApi = (data: LoginInfo) => {
  const { id, password } = JSON.parse(localStorage.getItem("account")!);

  if (id === data.id && password === data.password) return true;
  else return false;
};