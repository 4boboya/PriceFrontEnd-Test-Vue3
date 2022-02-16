<template>
  <div @click="closeAll">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import mitt from "@/library/global/Mitt"
export default defineComponent({
  setup() {
    const store = useStore();

    const setWidth = () => {
      store.dispatch("Global/SetWidth", window.innerWidth)
    };

    const closeAll = () => {
      mitt.emit("close")
    }

    window.addEventListener("resize", setWidth);
    setWidth();

    return { closeAll }
  },
});
</script>
