<template>
  <section class="new-posts">
    <div class="container">
      <div class="heading text-center">
        <h1>Newely Posted</h1>
        <hr />
      </div>
      <div class="col-12" v-for="(post, index) in data" :key="index">
        <div class="row post d-flex flex-wrap" v-if="post">
          <div class="img col-md-6 col-sm-12 text-center">
            <img class="img-fluid" :src="post.image" alt="" />
          </div>
          <div class="post-data col-md-6 col-sm-12 text-start">
            <span class="post-tag" v-if="post.tag">{{ post.tag[0].name }}</span>
            <h2 class="post-header" v-if="post.title">
              {{ post.title }}
            </h2>
            <p class="post-info" v-if="post.user">
              <span>{{ `${post.user.firstname} ${post.user.lastname}` }}</span>
              . <span>{{ post.createdAt }}</span>
              <span>({{ post.views }} views)</span>
            </p>
            <p class="post-text" v-if="post.desc">
              {{ post.desc }}...
              <router-link :to="{ name: 'Article', params: { id: post._id } }"
                >continue reading</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "NewPosts",
  props: {
    data: Object,
  },
};
</script>
