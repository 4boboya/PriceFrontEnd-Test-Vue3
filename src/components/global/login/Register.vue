<template>
  <div class="card">
    <h1>Register</h1>
    <section>
      <div class="input-div">
        <input
          type="text"
          placeholder="UserName"
          v-model="registerData.username"
        />
      </div>
      <div class="input-div">
        <input
          type="text"
          placeholder="E-mail"
          v-model="registerData.email"
        />
      </div>
      <div class="input-div">
        <input
          type="password"
          placeholder="Password"
          v-model="registerData.pwd"
        />
      </div>
      <div class="input-div">
        <input
          type="password"
          placeholder="Check Password"
          v-model="registerData.checkPwd"
        />
      </div>
      <div class="button-div">
        <div>
          <span v-show="registerData.pwdError">Password not same</span>
        </div>
        <button class="register-button">Register</button>
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
import { defineComponent, reactive, watch } from "vue";
import { useStore } from "vuex";
import { RegisterData } from "@/type/Login";
export default defineComponent({
  setup() {
    const store = useStore();
    let registerData = reactive({} as RegisterData);

    const login = () => {
      store.dispatch("Component/SetSingin", { status: true, component: "Login" });
    };

    const checkPWD = () => {
      return registerData.pwd != registerData.checkPwd;
    };

    watch(registerData, () => {
      registerData.pwdError = checkPWD();
    });

    return { registerData, login };
  },
});
</script>