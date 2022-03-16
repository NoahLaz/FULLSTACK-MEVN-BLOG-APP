import axios from "@/http-common";
import authHeader from "./auth-header";

class UserService {
  getAuthor(id) {
    return axios.get(`/users/${id}`);
  }
  registerUser(data) {
    return axios.post("/users/signup", data);
  }

  getUserBoard() {
    return axios.get("/user", { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get("/mod", { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get("/admin", { headers: authHeader() });
  }
}

export default new UserService();
