<template>
  <section class="login">
    <div class="container">
      <div class="row">
        <div class="col-8 mx-auto text-center">
          <div class="header mb-4">
            <h1 class="mb-3">Welcome back!</h1>
            <p>Sign in to get the most out of nuntium.</p>
          </div>
          <Form @submit="handleLogin" :validation-schema="state.schema">
            <div class="mb-4">
              <Field
                name="email"
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email address"
              />
              <ErrorMessage name="email" class="error-feedback" />
            </div>
            <div class="mb-4">
              <Field
                name="password"
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="mb-4 form-check d-flex">
              <div class="col-6 align-self-start text-start">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="exampleCheck1"
                />
                <label class="form-check-label" for="exampleCheck1"
                  >Remembere me</label
                >
              </div>
              <div class="col-6 align-self-end text-end">
                <a class="forgot" href="#">Forgot Password?</a>
              </div>
            </div>
            <div class="form-group">
              <button
                type="submit"
                class="login-btn w-100"
                :disabled="state.loading"
              >
                <span
                  v-show="state.loading"
                  class="spinner-border spinner-border-sm"
                ></span>
                <span>Login</span>
              </button>
              <div class="form-group">
                <div
                  v-if="state.message"
                  class="alert alert-danger"
                  role="alert"
                >
                  {{ state.message }}
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import * as yup from "yup";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state = reactive({
      loading: false,
      message: "",
      schema: yup.object().shape({
        email: yup
          .string()
          .required("Email is required!")
          .email("This field must be a valid email"),
        password: yup.string().required("Password is required!"),
      }),
    });

    // methods
    function handleLogin(user) {
      state.loading = true;

      store.dispatch("auth/login", user).then(
        (Response) => {
          router.push("/");
        },
        (error) => {
          state.loading = false;
          state.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
        }
      );
    }

    onMounted(() => {
      if (store.state.auth.status.loggedIn) {
        router.push("/");
      }
    });

    return { state, handleLogin };
  },
};
</script>
<style lang="scss" scoped>
section.login {
  padding: 5rem 0;
  .header {
    color: #000;
    h1 {
      font-family: "libre baskerville";
      font-size: 2.5rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
  form {
    .form-control {
      font-size: 1.5rem;
      padding: 2rem 3rem;
      background: #fff;
    }
    ::placeholder {
      color: #1c1c1c;
      opacity: 50%;
      font-size: 1.2rem;
      font-weight: 500;
    }
    .error-feedback {
      color: red;
      padding: 0.5rem;
      display: block;
    }
    .form-check-label {
      color: #1c1c1c;
      opacity: 50%;
      font-size: 1.2rem;
      font-weight: 500;
    }
    .forgot {
      text-decoration: none;
      color: #1c1c1c;
      opacity: 50%;
      font-size: 1.2rem;
      font-weight: 500;
    }
    .login-btn {
      font-family: "libre baskerville";
      padding: 1.5rem 3rem;
      background: #fff;
      border: 2px solid #1c1c1c;
      border-radius: 15px;
      font-size: 1.5rem;
      font-weight: bold;
      color: #1c1c1c;
    }
    .login-btn:hover {
      color: #fff;
      background: #1c1c1c;
      transition: 0.3s;
    }
  }
}
</style>
