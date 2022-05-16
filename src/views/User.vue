<template>
  <div class="content">
    <UserSidebar :Page="nowPage" />
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_scroll.scss";
@import "@/styles/_common.scss";

.content {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 205px);
}

.main {
  height: 100%;

  & > .scroll {
    overflow-y: auto;
    overflow-x: hidden;
    height: calc(100vh - 235px);

    @extend %scroll !optional;
  }
}

.content-data {
  position: relative;
  min-height: calc(100% - 125px);
}
</style>

<script lang="ts">
import { defineComponent, defineAsyncComponent, computed , ref, watch} from "vue";
import { useRoute } from "vue-router"

export default defineComponent({
  components: {
    UserSidebar: defineAsyncComponent(() => import("@/components/user/ui/Sidebar.vue")),
  },
  setup() {
    const route = useRoute()
    const name = computed(() => { return route.name })
    const nowPage = ref<string>("profile")

    const setNowPage = () => {
      if (name.value) nowPage.value = name.value as string
      else nowPage.value = 'profile'
    }

    setNowPage()

    watch(
      () => { name.value },
      () => setNowPage(),
      { deep: true }
    )

    return { nowPage }
  }
});
</script>