<template>
  <section class="random">
    <div class="container-fluid">
      <div class="row">
        <div
          v-if="data"
          class="random-post"
          :style="'background-image: url(' + data.image + ')'"
        >
          <div class="post d-flex flex-column">
            <h6 v-if="data.tag">{{ data.tag[0].name }}</h6>
            <h2 class="post-header" v-if="data.title">
              {{ data.title }}
            </h2>
            <p class="post-info">
              <span v-if="data.user">{{
                `${data.user.firstname} ${data.user.lastname}`
              }}</span>
              .
              <span>{{ data.createdAt }}</span>
              <span>({{ data.views }} views)</span>
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
  name: "RandomPost",
  props: {
    data: Object,
  },
};
</script>
