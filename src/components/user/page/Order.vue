<template>
  <div class="context">
    <ControlBar v-model="page" />
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
    ControlBar: defineAsyncComponent(() => import("@/components/user/ui/OrderControl.vue")),
  },
  setup() {
    const page = ref<string>("buy")

    watch(
      () => { return page.value },
      () => { console.log(page.value); }
    )

    return { page }
  }
})
</script>
