<template>
  <div class="content">
    <Step :NowStep="nowStep" @next="next">
      <template v-slot>
        <div class="stored-content">
          <Option v-if="nowStep == 'option'" @next="next" />
          <Method v-if="nowStep == 'method'" @next="next" />
          <Success v-if="nowStep == 'success'" />
        </div>
      </template>
    </Step>
  </div>
</template>

<style lang="scss" scoped>
.content {
  width: 100%;
  min-height: calc(100vh - 205px);
}
.stored-content {
  padding-inline: 5px;
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from 'vue'

export default defineComponent({
  components: {
    Step: defineAsyncComponent(() => import("@/components/stored/ui/Step.vue")),
    Option: defineAsyncComponent(() => import("@/components/stored/page/Option.vue")),
    Method: defineAsyncComponent(() => import("@/components/stored/page/Method.vue")),
    Success: defineAsyncComponent(() => import("@/components/stored/page/Success.vue")),
  },
  setup() {
    const nowStep = ref<string>("option")

    const next = (step: string) => {
      nowStep.value = step
    }

    return { nowStep, next }
  },
})
</script>
