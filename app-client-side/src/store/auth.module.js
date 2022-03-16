import AuthService from "@/services/auth-service";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,

  state: initialState,

  getters: {
    loginStatus(state) {
      return state.status.loggedIn;
    },
  },

  mutations: {
    checkForLoginStatus(state) {
      setInterval(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          state.status.loggedIn = false;
        }
      }, 1000);
    },

    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
  },

  actions: {
    checkForLoginStatus({ commit }) {
      commit("checkForLoginStatus");
    },

    login({ commit }, user) {
      return AuthService.login(user).then(
        (user) => {
          commit("loginSuccess", user);
          return Promise.resolve(user);
        },

        (error) => {
          commit("loginFailure");
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit("logout");
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit("registerSuccess");
          return Promise.resolve(response.data);
        },

        (error) => {
          commit("registerFailure");
          return Promise.reject(error);
        }
      );
    },
  },
};
