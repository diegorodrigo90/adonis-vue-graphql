<script>
export default {
  data () {
    return {
      formData: {
        email: '',
        password: '',
        remmenber: ''
      },
      errors: {},
      error: ''
    }
  },
  methods: {
    login () {
      this.$store
        .dispatch('login', this.formData)
        .then(() => {
          // this.$snotify.success("Sucesso ao logar", "OK");
          this.$router.push({ name: 'landing' })
        })
        .catch(response => {
          console.log(response)
          this.error = response.error
          // this.$snotify.error("Falha...", "Erro");
        })
    }
  }
}
</script>

<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">
          <card
            type="secondary"
            shadow
            header-classes="bg-white pb-5"
            body-classes="px-lg-5 py-lg-5"
            class="border-0"
          >
            <template>
              <div class="text-muted text-center mb-3">
                <small>Sign in with</small>
              </div>
              <div class="btn-wrapper text-center">
                <base-button type="neutral">
                  <img
                    slot="icon"
                    src="img/icons/common/github.svg"
                  >
                  Github
                </base-button>

                <base-button type="neutral">
                  <img
                    slot="icon"
                    src="img/icons/common/google.svg"
                  >
                  Google
                </base-button>
              </div>
            </template>
            <template>
              <div class="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <form
                class="form"
                @keyup.enter.prevent="login"
              >
                <div
                  v-if="error"
                  class="alert alert-warning"
                  v-text="error"
                />

                <div
                  class="form-group"
                  :class="{ 'has-error': errors.email }"
                >
                  <base-input
                    v-model="formData.email"
                    alternative
                    class="mb-3"
                    placeholder="Email"
                    addon-left-icon="ni ni-email-83"
                  />

                  <div
                    v-if="errors.email"
                    class="help-block"
                  >
                    <div
                      v-for="(error, index) in errors.email"
                      :key="index"
                    >
                      <strong>{{ error }}</strong>
                    </div>
                  </div>
                </div>

                <div
                  class="form-group"
                  :class="{ 'has-error': errors.email }"
                >
                  <base-input
                    v-model="formData.password"
                    alternative
                    type="password"
                    placeholder="Password"
                    addon-left-icon="ni ni-lock-circle-open"
                  />

                  <div
                    v-for="(error, index) in errors.password"
                    :key="index"
                  >
                    <strong>{{ error }}</strong>
                  </div>
                </div>

                <base-checkbox>
                  Remember me
                </base-checkbox>
                <div class="text-center">
                  <base-button
                    type="primary"
                    class="my-4"
                    @click="login()"
                  >
                    Sign In
                  </base-button>
                </div>
              </form>
            </template>
          </card>
          <div class="row mt-3">
            <div class="col-6">
              <a
                href="#"
                class="text-light"
              >
                <small>Forgot password?</small>
              </a>
            </div>
            <div class="col-6 text-right">
              <a
                href="#"
                class="text-light"
              >
                <small>Create new account</small>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
