<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">
        <span>bl</span>ogicon.
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item active">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/tags" class="nav-link">Tags</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </ul>
        <form class="d-flex search-bar">
          <div class="search d-flex">
            <input
              class="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="state.searchField"
            />

            <i class="fas fa-search" @click="search"></i>
          </div>
        </form>
        <router-link
          v-if="!state.loggedIn"
          to="/login"
          class="login-btn text-decoration-none"
          >Login</router-link
        >
        <div v-if="state.loggedIn" class="user-nav position-relative">
          <div @click="state.isHidden = !state.isHidden" class="img">A</div>
          <div
            class="user-controll position-absolute d-flex flex-column"
            v-if="state.isHidden"
          >
            <span class="name">Arthur Black</span>
            <span class="username">@arthurblack</span>
            <hr class="w-100 mb-2 mt-2" />
            <span
              class="navlinks"
              @click="
                state.isHidden = !state.isHidden;
                router.push('/create-post');
              "
              >Write Post</span
            >
            <span class="navlinks">Help</span>
            <span class="navlinks" @click="logout">Sign Out</span>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "AppHeader",
  setup() {
    const router = useRouter();
    const store = useStore();

    const state = reactive({
      search: false,
      loggedIn: false,
      isHidden: false,
      searchField: "",
    });

    const search = () => {
      router.push({ name: "Tags", params: { tag: state.searchField } });
    };

    store.watch(
      (state, getters) => getters["auth/loginStatus"],
      (currentvalue) => {
        state.loggedIn = currentvalue;
      }
    );

    onMounted(() => {
      state.loggedIn = store.getters["auth/loginStatus"];
      store.dispatch("auth/checkForLoginStatus");
    });

    function logout() {
      state.isHidden = !state.isHidden;
      store.dispatch("auth/logout");
      router.push("/login");
    }
    return { state, logout, router, search };
  },
};
</script>
<style lang="scss" scoped>
nav.navbar {
  @import url("https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap");

  font-family: "libre baskerville";
  background-color: #fff;
  padding: 1rem 0;
  z-index: 1;
  border-bottom: 2px solid rgba(28, 28, 28, 0.103);

  .navbar-brand {
    font-size: 1.6rem;
    font-weight: bold;
    color: #1c1c1c;
    span {
      background-color: #1c1c1c;
      color: #fff;
      padding: 10px 0 2px 15px;
    }
  }
  .nav-item {
    padding: 0 0.7rem;
    a {
      color: #000;
    }
  }
  .nav-item.active {
    font-weight: bold;
  }
  .search-bar {
    padding: 0 0.5rem;
    .search {
      input {
        border: 1px solid #1c1c1c;
        border-radius: 15px;
      }
      i {
        font-size: 1.6rem;
        padding: 0.6rem;
        cursor: pointer;
        color: #1c1c1c;
      }
    }
  }

  .login-btn {
    padding: 0.6rem 2rem;
    background-color: #fff;
    color: #1c1c1c;
    border: 2px solid #1c1c1c;
    border-radius: 15px;
  }
  .login-btn:hover {
    color: #fff;
    background: #1c1c1c;
    transition: 0.3s;
  }
  .user-nav {
    font-family: "Open Sans", sans-serif;
    .img {
      background-color: #1c1c1c;
      border-radius: 50px;
      width: 50px;
      height: 50px;
      color: #fff;
      text-align: center;
      font-size: 2.2rem;
      line-height: 50px;
      cursor: pointer;
    }
    .user-controll {
      right: 0;
      margin-top: 5px;
      background: #fff;
      border: 1px solid rgba(28, 28, 28, 0.3);
      border-radius: 10px;
      padding: 1.5rem;
      min-width: 180px;

      span {
        padding: 0.2rem;
      }
      .navlinks {
        cursor: pointer;
        transition: 0.3s;
      }
      :hover {
        text-decoration: underline;
      }
      .name {
        font-weight: bold;
        color: #000;
      }
    }
  }
}
</style>
