<template>
  <section class="tags">
    <div class="container">
      <div class="row">
        <div class="search col-8 mx-auto">
          <input
            v-model="state.tag"
            @input="getPostsByTag"
            type="text"
            placeholder="find topics you care about..."
          />
          <i class="fas fa-search"></i>
        </div>
        <div class="col-12" v-if="state.tag.length === 0">
          <ul class="tags d-flex flex-wrap" v-if="state.tags.length">
            <li
              v-for="(tag, index) in state.tags"
              :key="index"
              @click="searchByTag(tag.name)"
            >
              {{ tag.name }}
            </li>
          </ul>
        </div>
      </div>
      <div class="posts row" v-if="state.posts.length && state.tag.length">
        <div class="col-12 d-flex flex-column gap-5">
          <div
            class="row post"
            v-for="(post, index) in state.posts"
            :key="index"
          >
            <div class="img col-md-5 col-sm-12" v-if="post.image">
              <img
                class="img-thumbnail"
                :src="'http://localhost:8081/uploads/' + post.image"
                alt=""
              />
            </div>
            <div class="post-data col-md-7 col-sm-12 text-start">
              <span class="post-tag" v-if="post.tag">{{
                post.tag[0].name
              }}</span>
              <h2 class="post-header" v-if="post.title">
                {{ post.title }}
              </h2>
              <p class="post-info">
                <span v-if="post.user">{{
                  `${post.user.firstname} ${post.user.lastname}`
                }}</span>
                .
                <span>May 7, 2019</span>
              </p>
              <p class="post-text" v-if="post.desc">
                {{ post.desc }}...
                <a href="#">continue reading</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { onMounted, reactive } from "vue";
import postService from "@/services/post-service.js";
import tagService from "@/services/tag-service.js";
import { useRoute } from "vue-router";
export default {
  name: "RandomPosts",
  setup() {
    const route = useRoute();
    const state = reactive({
      posts: [],
      tags: [],
      tag: "",
    });

    function searchByTag(tName) {
      state.tag = tName;
      getPostsByTag();
    }

    async function getPostsByTag() {
      let tags = await tagService
        .findByName(state.tag)
        .then((Response) => {
          return Response.data.tags;
        })
        .catch((e) => console.log(e));
      console.log(tags);
      postService
        .findByTag(tags)
        .then((Response) => {
          state.posts = Response.data;
        })
        .catch((e) => console.log(e));
    }

    const getTags = () => {
      tagService
        .getAll()
        .then((Response) => {
          state.tags = Response.data.tags;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    onMounted(() => {
      state.tag = route.params.tag;
      getPostsByTag();
    });

    getTags();

    return { state, getPostsByTag, searchByTag };
  },
};
</script>
<style lang="scss" scoped>
*:not(i) {
  font-family: "Open Sans", sans-serif;
}
section.tags {
  padding: 8rem 0;
  .search {
    position: relative;
    input {
      border: 1px solid #1c1c1c;
      border-radius: 22px;
      padding: 1rem 3rem;
      width: 100%;
    }
    i {
      position: absolute;
      top: 50%;
      right: 2rem;
      font-size: 1.4rem;
      transform: translateY(-50%);
    }
  }
  ul {
    padding: 2rem 0;
    justify-content: center;
    list-style: none;
    li {
      padding: 0.5rem 1.5rem;
      border: 1px solid #1c1c1c;
      border-radius: 20px;
      margin: 0.5rem 1rem;
      cursor: pointer;
      transition: 0.3s;
    }
    :hover {
      background: #1c1c1c;
      color: #fff;
    }
  }

  .posts {
    padding: 3rem;
  }
}
</style>
