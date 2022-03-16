<template>
  <section class="register">
    <div class="container">
      <div class="row">
        <div
          class="register-form col-8 mx-auto text-center bg-white border-3 p-4"
        >
          <div class="header mb-4">
            <h1 class="mb-3">Register</h1>
            <p>Register to get the most out of nuntium.</p>
          </div>
          <Form @submit="handleSignup" :validation-schema="state.schema">
            <div class="mb-4">
              <Field
                name="username"
                type="text"
                class="form-control"
                id="username"
                placeholder="Username"
              />
              <ErrorMessage name="username" class="error-feedback" />
            </div>

            <div class="mb-4">
              <Field
                name="email"
                type="email"
                class="form-control"
                id="emailId"
                aria-describedby="emailHelp"
                placeholder="Email address"
              />
              <ErrorMessage name="email" class="error-feedback" />
            </div>

            <div class="mb-4">
              <Field
                name="firstname"
                type="text"
                class="form-control"
                id="fistname"
                placeholder="Fisrtname"
              />
              <ErrorMessage name="firstname" class="error-feedback" />
            </div>
            <div class="mb-4">
              <Field
                name="lastname"
                type="text"
                class="form-control"
                id="lastname"
                placeholder="Lastname"
              />
              <ErrorMessage name="lastname" class="error-feedback" />
            </div>
            <div class="mb-4">
              <Field
                name="password"
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" class="error-feedback" />
            </div>
            <div class="mb-4">
              <Field
                name="confirmPassord"
                type="password"
                class="form-control"
                id="confirmPassord"
                placeholder="Confirm Password"
              />
              <ErrorMessage name="confirmPassord" class="error-feedback" />
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
import { reactive } from "vue";
import { useRouter } from "vue-router";
import userService from "@/services/user-service";
import * as yup from "yup";

export default {
  name: "Register",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  setup() {
    const router = useRouter();

    const state = reactive({
      loading: false,
      message: "",
      schema: yup.object().shape({
        username: yup.string().required("Username is Required!"),
        firstname: yup.string().required("firstname is Required!"),
        lastname: yup.string().required("lastname is Required!"),
        email: yup
          .string()
          .required("Email is required!")
          .email("This field must be a valid email"),
        password: yup.string().required("Password is Required!"),
        confirmPassord: yup
          .string()
          .oneOf([yup.ref("password"), null], "Password Must Match"),
      }),
    });

    // methods
    function handleSignup(user) {
      state.loading = true;
      userService
        .registerUser(user)
        .then((Response) => {
          router.push("/login");
        })
        .catch((error) => console.log(error));
    }

    return { state, handleSignup };
  },
};
</script>
<style lang="scss" scoped>
section.register {
  .register-form {
    box-shadow: 0 0 4px rgba(28, 28, 28, 0.3);
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
        padding: 1.5rem 3rem;
        background: #f8f8f8;
        border: none;
      }
      ::placeholder {
        color: #1c1c1c;
        opacity: 50%;
        font-size: 1.2rem;
        font-weight: 500;
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
      .error-feedback {
        color: red;
        display: block;
        padding: 0.5rem;
      }
    }
  }
}
</style>
