<template>
  <div class="change-content">
    <fieldset>
      <legend>{{ t("User.OldPassword") }}</legend>
        <input type="password" v-model="oldPassword" autocomplete="false">
      <div />
    </fieldset>
    <fieldset>
      <legend>{{ t("User.NewPassword") }}</legend>
        <input type="password" v-model="newPassword" autocomplete="false">
      <div />
    </fieldset>
    <fieldset>
      <legend>{{ t("User.CheckPassword") }}</legend>
        <input type="password" v-model="checkPassword" autocomplete="false">
      <div />
    </fieldset>
    <div class="submit-div">
      <button @click="submit">{{ t("User.Submit") }}</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.change-content {
  padding-inline: 20px;
}
fieldset {
  position: relative;
  margin-top: 10px;
  padding: unset;
  border-color: transparent;
  legend {
    margin-left: 20px;
    padding-inline: 10px;
    color: var(--main-font);
    background-color: var(--bg-color);
  }
  input {
    width: calc(100% - 40px);
    height: 24px;
    background-color: transparent;
    color: var(--main-font);
    border: unset;
    outline: unset;
    font-size: 16px;
    padding-inline: 20px;

    &:focus ~ div {
      border: 2px solid var(--input-border);
    }
  }
  & > div {
    height: calc(100% + 12px);
    width: 100%;
    position: absolute;
    top: -12px;
    left: 0;
    border: 2px solid var(--white-border);
    z-index: -1;
    transition: all 0.2s ease;
  }
}
.submit-div {
  margin-top: 20px;
  padding-inline: 20px;
  text-align: right;
  button {
    border: 2px solid var(--white-border);
    background-color: transparent;
    color: var(--main-font);
    padding: 4px 10px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: var(--input-border);
      background-color: var(--input-border);
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n";
import { UpdatePassword } from "@/api/user"
import { IUserInfo } from "@/type/Vuex"
import { IUpdatePassword } from "@/type/User"
import Logout from '@/library/global/Logout'
import { SetHint } from "@/library/global/Hint"

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const router = useRouter()
    const oldPassword = ref<string>("")
    const newPassword = ref<string>("")
    const checkPassword = ref<string>("")

    const submit = async () => {
      if (newPassword.value != checkPassword.value) {
        SetHint("修改失敗", "password not same", "error")
        return
      }
      const userInfo: IUserInfo = store.getters['User/GetUserInfo'] as IUserInfo
      const finger: string = store.getters['User/GetFinger'] as string
      const updateData: IUpdatePassword = {
        password: oldPassword.value,
        newPassword: checkPassword.value,
        finger: finger,
        token: userInfo.Token
      }
      await UpdatePassword(updateData).then((res) => {
        const response = res?.response
        const request = res?.request
        if (!response && !request) {
          if (res.code == 10310) {
            SetHint("修改成功", "密碼修改成功", "success")
            Logout()
            router.push("/")
          }
          else SetHint("修改失敗", res.message, "error")
        } else SetHint("修改失敗", response, "error")
      })
    }

    return { t, oldPassword, newPassword, checkPassword, submit }
  },
})
</script>
