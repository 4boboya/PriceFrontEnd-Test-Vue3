<template>
  <div class="context">
    <ControlBar v-model="page" />
    <BuyRecord v-show="page == 'buy'" />
    <StoreRecord v-show="page == 'store'" />
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
    BuyRecord: defineAsyncComponent(() => import("@/components/user/page/BuyRecord.vue")),
    StoreRecord: defineAsyncComponent(() => import("@/components/user/page/StoreRecord.vue")),
  },
  setup() {
    const page = ref<string>("buy")

    return { page }
  }
})
</script>
