<template>
  <div>
    <HotGame />
    <transition name="login">
      <div v-if="singin.status">
        <Singin />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const singin = computed(() => store.getters["Component/GetSingin"]);

    return { singin };
  },
});
</script>