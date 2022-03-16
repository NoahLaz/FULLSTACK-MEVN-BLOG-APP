<template>
  <section class="create-post">
    <div class="container">
      <div class="cont col-10 d-flex flex-column mx-auto bg-white">
        <img :src="state.previewImage" alt="" />
        <div class="article-content row justify-content-center p-5">
          <div class="col-md-10 col-sm-12 my-3">
            <form @submit.prevent="validateSubmit">
              <div class="mb-4">
                <label for="formFile" class="form-label">Image :</label>
                <input
                  class="form-control"
                  @change="previewImage"
                  type="file"
                  id="formFile"
                  ref="file"
                />
                <div v-if="validationErrors.image" class="text-danger py-2">
                  {{ validationErrors.image }}
                </div>
              </div>

              <div class="mb-4">
                <label for="postTitle" class="form-label">Title :</label>
                <input
                  name="title"
                  type="text"
                  class="form-control"
                  id="postTitle"
                  placeholder="Title"
                  v-model="post.title"
                />
                <div v-if="validationErrors.title" class="text-danger py-2">
                  {{ validationErrors.title }}
                </div>
              </div>

              <div class="mb-4">
                <label for="postTag" class="form-label">Tags :</label>
                <select
                  @change="post.tag = $event.target.value"
                  class="form-select"
                  id="postTag"
                >
                  <option value="">Select a tag</option>
                  <option
                    v-for="tag in state.tags"
                    :key="tag._id"
                    :value="tag._id"
                  >
                    {{ tag.name }}
                  </option>
                </select>
                <div v-if="validationErrors.tag" class="text-danger py-2">
                  {{ validationErrors.tag }}
                </div>
              </div>
              <div class="mb-4">
                <label for="postDesc" class="form-label">Description :</label>
                <textarea
                  name="postDesc"
                  type="text"
                  class="form-control"
                  id="postDesc"
                  cols="30"
                  rows="10"
                  v-model="post.desc"
                ></textarea>
                <div v-if="validationErrors.desc" class="text-danger py-2">
                  {{ validationErrors.desc }}
                </div>
              </div>
              <div class="mb-4">
                <label for="article" class="form-label">Content :</label>
                <quill-editor
                  name="article"
                  id="article"
                  ref="content"
                  contentType="html"
                  theme="snow"
                  toolbar="full"
                  @update:content="printContent($event)"
                />
                <div v-if="validationErrors.article" class="text-danger py-2">
                  {{ validationErrors.article }}
                </div>
              </div>

              <div class="form-group">
                <button type="submit" class="login-btn w-100">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import tagService from "@/services/tag-service.js";
import postService from "@/services/post-service";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

export default {
  name: "Article",
  components: {
    QuillEditor,
  },
  setup() {
    const router = useRouter();

    const file = ref(null);

    const validationErrors = reactive({
      title: "",
      desc: "",
      article: "",
      tag: "",
      image: "",
    });

    const post = reactive({
      title: null,
      desc: null,
      article: null,
      tag: null,
      image: null,
      user: "61c479c1625ebcf6703eb4bb",
    });

    const state = reactive({
      previewImage: null,
      tags: [],
    });
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

    const printContent = (e) => {
      post.article = `${e}`;
      if (e === `<p><br></p>`) {
        post.article = null;
      }
    };

    const validateSubmit = () => {
      //validating IMAGE
      if (!post.image) {
        validationErrors.image = "Select a Picture for this Article";
      } else validationErrors.image = null;
      if (!post.title) {
        validationErrors.title = "Title is Required for the Article";
      } else validationErrors.title = null;
      if (!post.desc) {
        validationErrors.desc = "Article Content is Required";
      } else validationErrors.desc = null;
      if (!post.article) {
        validationErrors.article = "Article Content is Required";
      } else validationErrors.article = null;
      if (post.tag <= 0) {
        validationErrors.tag = "Please Select a Tag for this Article";
      } else validationErrors.tag = null;

      if (post.image && post.title && post.article && post.desc && post.tag) {
        const formData = new FormData();
        formData.append("postImage", file.value.files[0]);
        formData.append("title", post.title);
        formData.append("desc", post.desc);
        formData.append("article", post.article);
        formData.append("user", post.user);
        formData.append("tag", post.tag);

        postService
          .create(formData)
          .then((Response) => {
            router.push(`/Article/${Response.data.createdPost._id}`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    const previewImage = () => {
      if (file.value.files[0]) {
        post.image = file.value.files[0].name;
        const reader = new FileReader();
        reader.readAsDataURL(file.value.files[0]);
        reader.onload = (e) => {
          state.previewImage = e.target.result;
        };
      } else state.previewImage = "";
    };

    getTags();

    return {
      post,
      file,
      state,
      validateSubmit,
      previewImage,
      validationErrors,
      printContent,
    };
  },
};
</script>
<style lang="scss" scoped>
.create-post {
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
      .login-btn {
        border: 1px solid #1c1c1c;
        background-color: #fff;
        padding: 0.5rem;
        border-radius: 5px;
        transition: 0.3s;
      }
      .login-btn:hover {
        color: #fff;
        background-color: #1c1c1c;
      }
    }
  }
}
</style>
