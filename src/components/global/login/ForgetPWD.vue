<template>
  <div class="card">
    <h1>Forget Password</h1>
    <section>
      <div class="input-div">
        <input type="text" placeholder="E-mail" />
      </div>
      <div class="button-div">
        <div/>
        <button class="register-button">Submit</button>
      </div>
    </section>
    <hr />
    <section>
      <div class="have-account">
        <span>Have an Account?</span>
        <span @click="login()"> Sign In</span>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_login.scss";
.button-div span {
  cursor: default;
}
.have-account {
  text-align: center;
  color: #dedede;
  font-size: 12px;

  & span:nth-child(2) {
    cursor: pointer;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from "vuex"
export default defineComponent({
  setup() {
    const store = useStore()

    const login = () => {
      store.dispatch("Component/SetSingin", {status: true, component: "Login"})
    }

    return { login }
  }
})
</script>