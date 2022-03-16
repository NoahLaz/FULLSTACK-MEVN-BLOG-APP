import axios from "axios";
const apiPath = "http://localhost:8081/users";

class AuthService {
  login(user) {
    return axios
      .post(apiPath + "/login", {
        email: user.email,
        password: user.password,
      })
      .then((response) => {
        console.log(response);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post("signup", {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
}

export default new AuthService();
