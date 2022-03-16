<template>
  <div class="home">
    <!-- Featured Post Starts -->
    <featured-post :data="state.maxViews" />
    <!-- Featured Post Ends -->

    <!-- New Posts Starts -->
    <new-posts :data="state.newPosts" />
    <!-- New Posts Ends -->

    <!-- Random Posts Starts -->
    <random-post :data="state.post" />
    <!-- Random Posts Ends -->

    <!-- Randoms Posts Starts -->
    <random-posts />
    <!-- Randoms Posts Ends -->
  </div>
</template>
<script>
import FeaturedPost from "@/components/home/FeaturedPost.vue";
import NewPosts from "@/components/home/NewPosts.vue";
import RandomPost from "@/components/home/RandomPost.vue";
import RandomPosts from "@/components/home/RandomPosts.vue";
import { reactive } from "vue";
import postService from "@/services/post-service";

export default {
  name: "Home",
  components: {
    FeaturedPost,
    NewPosts,
    RandomPost,
    RandomPosts,
  },

  setup() {
    const state = reactive({
      post: {},
      maxViews: {},
      newPosts: {},
      posts: {},
      tags: {},
    });

    const getPost = () => {
      postService
        .getAll()
        .then((Response) => {
          state.post =
            Response.data.posts[
              Math.floor(Math.random() * Response.data.count)
            ];
          state.posts = Response.data.posts.slice(1, 4);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getPost();

    const getMaxViews = () => {
      postService
        .getMaxViews()
        .then((Response) => {
          state.maxViews = Response.data.post;
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getMaxViews();

    const getNewPosts = () => {
      postService
        .getNewPosts()
        .then((Response) => {
          state.newPosts = Response.data.posts;
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getNewPosts();

    return { state };
  },
};
</script>

<style lang="scss">
p,
span,
div {
  font-family: "Open Sans", sans-serif;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "libre baskerville";
}

.featured {
  .featured-post {
    width: 100%;
    height: 600px;
    .post {
      background-color: #fff;
      max-width: 450px;
      padding: 4rem 2rem;
      transform: translateX(1.5rem);
      h6 {
        color: #1c1c1c;
        opacity: 50%;
        text-transform: uppercase;
        font-weight: 700;
      }
      .post-header {
        font-family: "libre baskerville";
        font-weight: bold;
        font-size: 1.75rem;
        line-height: 1.5;
      }
      .post-info {
        color: #1c1c1c;
        opacity: 50%;
        font-weight: 700;
      }
      .post-text {
        line-height: 25px;
        color: #000;
        font-weight: 400;
      }
    }
  }
}
.new-posts {
  padding: 1rem 0;
  .heading {
    padding: 3rem 0;
    h1 {
      color: #1c1c1c;
      font-weight: bold;
      letter-spacing: -1;
    }
    hr {
      width: 200px;
      border-top: 0.3rem solid #1c1c1c;
      margin: 0 auto;
      opacity: 90%;
    }
  }
  .post {
    background-color: #fff;
    padding: 1rem 2rem;
    margin: 2rem 0;
    border-radius: 5px;
    box-shadow: 0 0 4px rgba(28, 28, 28, 0.3);

    .img {
      position: relative;
      img {
        max-height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .post-data {
      padding: 2rem;
      .post-tag {
        color: #1c1c1c;
        opacity: 50%;
        text-transform: uppercase;
        font-weight: 700;
      }

      .post-header {
        font-family: "libre baskerville";
        font-weight: bold;
        font-size: 1.75rem;
        line-height: 1.5;
        color: #000;
      }
      .post-info {
        color: #1c1c1c;
        opacity: 50%;
        font-weight: 700;
      }
      .post-text {
        line-height: 25px;
        color: #000;
        font-weight: 400;
        margin-bottom: 0;
      }
    }
  }
}
.random {
  padding: 1rem 0;

  .random-post {
    width: 100%;
    height: 600px;
    position: relative;
    .post {
      background-color: #fff;
      max-width: 450px;
      padding: 3rem 2rem;
      position: absolute;
      right: 10%;
      top: 50%;

      transform: translateY(-50%);
      h6 {
        color: #1c1c1c;
        opacity: 50%;
        text-transform: uppercase;
        font-weight: 700;
      }
      .post-header {
        font-family: "libre baskerville";
        font-weight: bold;
        font-size: 1.75rem;
        line-height: 1.5;
      }
      .post-info {
        color: #1c1c1c;
        opacity: 50%;
        font-weight: 700;
      }
      .post-text {
        line-height: 25px;
        color: #000;
        font-weight: 400;
      }
    }
  }
}
.random-posts {
  padding: 1rem 0;

  .heading {
    h1 {
      color: #1c1c1c;
      font-weight: bold;
      letter-spacing: -1;
    }
    hr {
      width: 200px;
      border-top: 0.3rem solid #1c1c1c;
      margin: 0 auto;
      opacity: 90%;
    }
  }
  .img {
    max-height: 450px;
    img {
      max-height: 400px;
    }
  }
  .post {
    background-color: #fff;
    align-items: center;
    margin: 1rem 0;
    border-radius: 5px;
    box-shadow: 0 0 4px rgba(28, 28, 28, 0.3);
    padding: 1rem;
    .post-data {
      padding: 1rem 2rem;

      .post-tag {
        color: #1c1c1c;
        opacity: 50%;
        text-transform: uppercase;
        font-weight: 700;
      }

      .post-header {
        font-family: "libre baskerville";
        font-weight: bold;
        font-size: 1.75rem;
        line-height: 1.5;
        color: #000;
      }
      .post-info {
        color: #1c1c1c;
        opacity: 50%;
        font-weight: 700;
      }
      .post-text {
        line-height: 25px;
        color: #000;
        font-weight: 400;
        margin-bottom: 0;
      }
    }
  }

  .tags {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 4px rgba(28, 28, 28, 0.3);
    padding: 1rem 0;
    margin: 1rem 0;
    height: fit-content;
    h3 {
      font-weight: bold;
      margin-bottom: 1rem;
      text-transform: capitalize;
      color: #000;
    }
    ul {
      li {
        padding: 1rem;
        text-transform: capitalize;
        font-weight: 500;
        span {
          cursor: pointer;
          color: #000;
        }
      }
    }
  }
}
</style>
