<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();

    const setWidth = () => {
      store.dispatch("Global/SetWidth", window.innerWidth)
    };

    window.addEventListener("resize", setWidth);
    setWidth();
  },
});
</script>
