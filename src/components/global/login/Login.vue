<template>
  <div class="card">
    <h1>Login</h1>
    <section>
      <div class="input-div">
        <input type="text" placeholder="Account" v-model="loginData.account" />
      </div>
      <div class="input-div">
        <input
          type="password"
          placeholder="Password"
          v-model="loginData.password"
        />
      </div>
      <div class="button-div">
        <div>
          <span @click="register()">Register</span>
          <span @click="forget()">Forget Password?</span>
        </div>
        <button class="login-button" @click="login()">Login</button>
      </div>
    </section>
    <hr />
    <section>
      <div class="third-login">
        <button class="g-signin-button">Google</button>
        <button class="fb-signin-button">Facebook</button>
        <button class="twitter-signin-button">Twitter</button>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_login.scss";
</style>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { LoginData } from "@/type/Login"
import { useStore } from "vuex"
export default defineComponent({
  setup() {
    const store = useStore()
    let loginData = reactive({} as LoginData)

    const register = () => {
      store.dispatch("Component/SetSingin", {status: true, component: "Register"})
    }
    const forget = () => {
      store.dispatch("Component/SetSingin", {status: true, component: "Forget"})
    }
    const login = () => {
      console.log(loginData)
    }
    return { loginData, register, forget, login };
  },
});
</script>