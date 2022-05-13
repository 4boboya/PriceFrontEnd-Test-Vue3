<template>
  <div class="context">
    <ControlBar v-model="page" />
    <ChangeUserName v-show="page == 'username'" />
    <ChangePassword v-show="page == 'password'" />
  </div>
</template>

<style lang="scss" scoped>
.context {
  width: calc(100% - 260px);
  padding-inline: 20px;
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref, watch } from 'vue'

export default defineComponent({
  components: {
    ControlBar: defineAsyncComponent(() => import("@/components/user/ui/ProfileControl.vue")),
    ChangeUserName: defineAsyncComponent(() => import("@/components/user/page/ChangeUserName.vue")),
    ChangePassword: defineAsyncComponent(() => import("@/components/user/page/ChangePassword.vue")),
  },
  setup() {
    const page = ref<string>("username")

    watch(
      () => { return page.value },
      () => { console.log(page.value); }
    )

    return { page }
  }
})
</script>
