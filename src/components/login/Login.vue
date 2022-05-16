<template>
  <div class="card">
    <h1>{{ t("Login.Login") }}</h1>
    <section>
      <div class="input-div">
        <input type="text" :placeholder="t('Login.Mail')" v-model="loginData.account" />
      </div>
      <div class="input-div">
        <input type="password" :placeholder="t('Login.Password')" v-model="loginData.password" />
      </div>
      <div class="button-div">
        <div>
          <span @click="register()">{{ t("Login.Register") }}</span>
          <span @click="forget()">{{ t("Login.Forget") }}?</span>
        </div>
        <button class="login-button" @click="login()">{{ t("Login.Login") }}</button>
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
@import "@/styles/component/_login.scss";
</style>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";
import { useStore } from "vuex"
import { useI18n } from "vue-i18n";
import { Login } from "@/api/user"
import { ILoginData } from "@/type/User"
import { SetHint } from "@/library/global/Hint"
export default defineComponent({
  setup() {
    const store = useStore()
    const { t } = useI18n()
    const finger = computed(() => store.getters["User/GetFinger"])
    let loginData = reactive({} as ILoginData)

    const register = () => {
      store.dispatch("Component/SetSingin", {status: true, component: "Register"})
    }
    const forget = () => {
      store.dispatch("Component/SetSingin", {status: true, component: "Forget"})
    }
    const login = async () => {
      loginData.finger = finger.value
      await Login(loginData).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request) {
          if (res?.code == 10200) {
            store.dispatch("User/SetUser", res)
            store.dispatch("User/SetStatus", true)
            store.dispatch("Component/CloseSingin", false)
            SetHint("登入成功", "歡迎回來", "success")
          } else SetHint("登入失敗", res.message, "error")
        } else SetHint("登入失敗", response, "error")
      })
    }
    return { t, loginData, register, forget, login };
  },
});
</script>