import { myAxios } from "./helper";

export const signUp = (user) => {
  return myAxios.post("/api/auth/signup", user).then((response) => response.json());
};
