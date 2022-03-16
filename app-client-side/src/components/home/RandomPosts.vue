<template>
  <section class="random-posts">
    <div class="container">
      <div class="row">
        <div class="col-md-10 col-sm-12 d-flex flex-column">
          <div v-if="state.posts.length">
            <div
              class="row post"
              v-for="(post, index) in state.posts"
              :key="index"
            >
              <div class="img col-md-5 col-sm-12" v-if="post.image">
                <img class="img-thumbnail" :src="post.image" alt="" />
              </div>
              <div class="post-data col-md-7 col-sm-12 text-start">
                <span class="post-tag" v-if="post.tag[0]">{{
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
                  <span>{{ post.createdAt }}</span>
                  <span>({{ post.views }} views)</span>
                </p>
                <p class="post-text" v-if="post.desc">
                  {{ post.desc }}...
                  <router-link
                    :to="{ name: 'Article', params: { id: post._id } }"
                    >continue reading</router-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="tags col-md-2 col-sm-12 text-center">
          <h3>tags.</h3>
          <ul class="list-unstyled" v-if="state.tags.length">
            <li v-for="(tag, index) in state.tags" :key="index">
              <span
                class="text-decoration-none"
                @click="getPostsByTag(tag._id)"
                >{{ tag.name }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive } from "vue";
import postService from "@/services/post-service";
import tagService from "@/services/tag-service";
export default {
  name: "RandomPosts",

  setup() {
    const state = reactive({
      posts: [],
      tags: [],
    });

    const getPost = () => {
      postService
        .getAll()
        .then((Response) => {
          state.posts = Response.data.posts.slice(0, 4);
        })
        .catch((e) => {
          console.log(e);
        });
    };

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

    const getPostsByTag = (tagId) => {
      postService
        .findByTag(tagId)
        .then((Response) => {
          Response.data.forEach((post) => {
            post.image = "http://localhost:8081/uploads/" + post.image;
          });
          state.posts = Response.data;
        })
        .catch((e) => console.log(e));
    };

    getPost();
    getTags();

    return { state, getPostsByTag };
  },
};
</script>
