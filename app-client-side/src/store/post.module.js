import PostService from "@/services/post-service";

export const post = {
  namespaced: true,

  state: {
    posts: [],
    post: Object,
  },

  getters: {
    getPosts(state) {
      return state.posts;
    },
    getPost(state) {
      return state.post;
    },
  },

  mutations: {
    GET_POST_FROM_DB() {
      PostService.getAll()
        .then((Response) => {
          return Response.data.posts[0];
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GET_POSTS_FROM_DB(state) {
      PostService.getAll()
        .then((Response) => {
          state.posts = Response.data.posts;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  actions: {
    getPostFromDb({ commit }) {
      commit("GET_POST_FROM_DB");
    },

    getPostsFromDb({ commit }) {
      commit("GET_POSTS_FROM_DB");
    },
  },
};
