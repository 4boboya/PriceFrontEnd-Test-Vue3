<template>
  <div class="card">
    <h1>{{ t("Login.Register") }}</h1>
    <section>
      <div class="input-div">
        <input type="text" :placeholder="t('Login.UserName')" v-model="registerData.username" />
      </div>
      <div class="input-div">
        <input type="text" :placeholder="t('Login.Mail')" v-model="registerData.email" />
      </div>
      <div class="input-div">
        <input type="password" :placeholder="t('Login.Password')" v-model="registerData.pwd" />
      </div>
      <div class="input-div">
        <input type="password" :placeholder="t('Login.Check')" v-model="registerData.checkPwd" />
      </div>
      <div class="button-div">
        <div>
          <span v-show="registerData.pwdError">{{ t("Login.NotSame") }}</span>
        </div>
        <button class="register-button">{{ t("Login.Register") }}</button>
      </div>
    </section>
    <hr />
    <section>
      <div class="have-account">
        <span>{{ t("Login.Have") }}? </span>
        <span @click="login()"> {{ t("Login.Sign") }}</span>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_login.scss";
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
import { useI18n } from "vue-i18n";
import { IRegisterData } from "@/type/Login";
export default defineComponent({
  setup() {
    const store = useStore();
    const { t } = useI18n()
    let registerData = reactive({} as IRegisterData);

    const login = () => {
      store.dispatch("Component/SetSingin", { status: true, component: "Login" });
    };

    const checkPWD = () => {
      return registerData.pwd != registerData.checkPwd;
    };

    watch(registerData, () => {
      registerData.pwdError = checkPWD();
    });

    return { t, registerData, login };
  },
});
</script>