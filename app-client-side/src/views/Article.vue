<template>
  <section class="article" v-if="state.post">
    <div class="container">
      <div class="cont col-10 d-flex flex-column mx-auto bg-white">
        <div class="image row">
          <img
            class="img-fluid p-0"
            v-if="state.post.image"
            :src="state.post.image"
            alt=""
          />
        </div>
        <div class="article-content row justify-content-center p-5">
          <div class="col-md-10 col-sm-12">
            <h1 v-if="state.post.title" class="article-header text-center">
              {{ state.post.title }}
            </h1>
            <p class="article-info text-center">
              <span
                v-if="state.post.user.firstname && state.post.user.lastname"
                >{{
                  `${state.post.user.firstname} ${state.post.user.lastname}`
                }}</span
              >
              .
              <span>May 7, 2019 </span>
              <span>({{ state.post.views }} views)</span>
            </p>
            <p v-if="state.post.tag" class="article-tags text-center">
              <span>{{ state.post.tag[0].name }}</span>
            </p>
            <p
              v-if="state.post.article"
              v-html="state.post.article"
              class="article-body"
            ></p>
          </div>
        </div>
        <div class="article-author row p-5 justify-content-center">
          <div class="col-md-10 col-sm-12">
            <span class="abt">ABOUT THE AUTHOR</span>
            <div class="author d-flex">
              <div class="img col-md-4 col-sm-12">
                <img src="" alt="" />
              </div>
              <div class="author-info col-md-8 col-sm-12">
                <h3
                  class="name"
                  v-if="state.post.user.firstname && state.post.user.lastname"
                >
                  {{
                    `${state.post.user.firstname} ${state.post.user.lastname}`
                  }}
                </h3>
                <span class="username" v-if="state.post.user.username"
                  >@{{ state.post.user.username }}</span
                >
                <p class="about">
                  Ipsum adipisicing culpa est nisi consequat ex amet magna culpa
                  veniam tempor irure ea. Reprehenderit labore do tempor eiusmod
                  in consectetur ex sunt id mollit commodo ipsum deserunt quis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <div class="nav row"></div>
    </div>
  </section>
</template>
<script>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import postService from "@/services/post-service";

export default {
  name: "Article",
  setup() {
    const route = useRoute();
    const state = reactive({
      post: null,
    });

    const getPost = async () => {
      try {
        await postService
          .get(route.params.id)
          .then((Response) => {
            state.post = Response.data.post;
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(console.error());
      }
    };

    // run getpost function before mounting the page
    getPost();

    return { state };
  },
};
</script>
<style lang="scss" scoped>
.article {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "libre baskerville";
  }
  p,
  span,
  a {
    font-family: "Open Sans", sans-serif;
  }
  .cont {
    border-radius: 5px;
    box-shadow: 0 0 4px rgba(28, 28, 28, 0.3);
    .article-content {
      .article-header {
        font-weight: bold;
        color: #000;
        margin-bottom: 1.3rem;
      }
      .article-info {
        opacity: 50%;
        color: #1c1c1c;
        font-weight: 700;
      }
      .article-tags {
        opacity: 50%;
        color: #1c1c1c;
        font-weight: 700;
      }
      .article-body {
        color: #1c1c1c;
        font-weight: 500;
        letter-spacing: 1px;
        line-height: 1.8;
        opacity: 0.9;
        text-align: justify;
      }
    }
  }
  .article-author {
    .abt {
      opacity: 50%;
      color: #1c1c1c;
      font-weight: 500;
    }
    .img {
      position: relative;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 150px;
        height: 150px;
        background-color: #1c1c1c;
        border-radius: 100px;
        box-shadow: 0 0 4px rgba(28, 28, 28, 0.3);
      }
    }
    .author-info {
      h3 {
        color: #000;
        font-weight: bold;
      }
      .username {
        opacity: 50%;
        color: #1c1c1c;
        font-weight: 500;
      }
    }
  }
}
</style>
