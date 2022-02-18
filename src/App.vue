<template>
  <div @click="closeAll">
    <Header />
    <router-view />
    <Chat />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
import mitt from "@/library/global/Mitt";
import Finger from "@/library/global/Finger";
export default defineComponent({
  setup() {
    const store = useStore();

    const setWidth = () => {
      store.dispatch("Global/SetWidth", window.innerWidth);
    };

    const closeAll = () => {
      mitt.emit("close");
    };

    Finger.Create();
    window.addEventListener("resize", setWidth);
    setWidth();

    return { closeAll };
  },
});
</script>
