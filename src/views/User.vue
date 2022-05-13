<template>
  <div class="content">
    <UserSidebar :Page="nowPage" />
    <Profile v-if="nowPage == 'profile'" />
    <Order v-else-if="nowPage == 'order'" />
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
    Profile: defineAsyncComponent(() => import("@/components/user/page/Profile.vue")),
    Order: defineAsyncComponent(() => import("@/components/user/page/Order.vue")),
  },
  setup() {
    const route = useRoute()
    const query = computed(() => { return route.query })
    const nowPage = ref<string>("profile")

    const setNowPage = () => {
      if (query.value.page) nowPage.value = query.value.page as string
      else nowPage.value = 'profile'
    }

    setNowPage()

    watch(
      () => { query.value },
      () => setNowPage(),
      { deep: true }
    )

    return { nowPage }
  }
});
</script>