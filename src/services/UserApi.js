import api from "./api";

export default class UserApi {
  signUp(email, password) {
    return api.post("/users", { email, password });
  }

  signOut(userId) {
    return api.post("/users/sign-out", { userId });
  }
}
