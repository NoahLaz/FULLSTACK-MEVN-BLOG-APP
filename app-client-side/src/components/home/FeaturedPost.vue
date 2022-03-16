<template>
  <section class="featured">
    <div class="container-fluid">
      <div class="row">
        <div
          v-if="data"
          class="featured-post"
          :style="'background-image: url(' + data.image + ')'"
        >
          <div class="post d-flex flex-column">
            <h6>FEATURED ARTICLE</h6>
            <h2 class="post-header" v-if="data.title">
              {{ data.title }}
            </h2>
            <p class="post-info" v-if="data.user">
              <span>{{ `${data.user.firstname} ${data.user.lastname}` }}</span>
              .
              <span>{{ data.createdAt }} </span>
              <span> ({{ data.views }} views)</span>
            </p>
            <p class="post-text" v-if="data.desc">
              {{ data.desc }}...
              <router-link :to="{ name: 'Article', params: { id: data._id } }"
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
  name: "FeaturedPost",

  props: {
    data: Object,
  },
};
</script>
