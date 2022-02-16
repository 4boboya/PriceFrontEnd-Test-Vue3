<template>
  <div class="control-bar">
    <ControlType />
    <div class="control-other">
      <ControlCanvas v-if="Width > 868"/>
      <ControlGameType />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.control-bar {
  position: relative;
  background-color: #7e0234;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

.control-other {
  display: flex;
}
</style>

<script lang="ts">
import { computed, defineComponent, defineAsyncComponent } from 'vue'
import { useStore} from "vuex"
export default defineComponent({
  components: {
    ControlType: defineAsyncComponent(() => import("@/components/ui/home/ControlType.vue")),
    ControlCanvas: defineAsyncComponent(() => import("@/components/ui/home/ControlCanvas.vue")),
    ControlGameType: defineAsyncComponent(() => import("@/components/ui/home/ControlGameType.vue")),
  },
  setup() {
    const store = useStore();
    const Width = computed(() => { return store.getters["Global/GetWidth"]})

    return { Width }
  }
})
</script>