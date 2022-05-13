<template>
  <div class="change-content">
    <fieldset>
      <legend>舊密碼</legend>
      <input type="password" v-model="oldPassword">
      <div />
    </fieldset>
    <fieldset>
      <legend>新密碼</legend>
      <input type="password" v-model="newPassword">
      <div />
    </fieldset>
    <fieldset>
      <legend>確認新密碼</legend>
      <input type="password" v-model="checkPassword">
      <div />
    </fieldset>
    <div class="submit-div">
      <button>送出</button>
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

export default defineComponent({
  setup() {
    const oldPassword = ref<string>("")
    const newPassword = ref<string>("")
    const checkPassword = ref<string>("")

    return { oldPassword, newPassword, checkPassword }
  },
})
</script>
