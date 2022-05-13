<template>
  <div class="card">
    <h1>{{ t("Login.Forget") }}</h1>
    <section>
      <div class="input-div">
        <input type="text" :placeholder="t('Login.Mail')" />
      </div>
      <div class="button-div">
        <div/>
        <button class="register-button">{{ t("Login.Submit") }}</button>
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
import { defineComponent } from 'vue'
import { useStore } from "vuex"
import { useI18n } from "vue-i18n";
export default defineComponent({
  setup() {
    const store = useStore()
    const { t } = useI18n()

    const login = () => {
      store.dispatch("Component/SetSingin", {status: true, component: "Login"})
    }

    return { login, t }
  }
})
</script>