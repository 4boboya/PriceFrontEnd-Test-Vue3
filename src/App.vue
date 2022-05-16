<template>
  <div @click="closeAll">
    <!-- <Hint /> -->
    <template v-for="(item, index) in hint" :key="`${item.id}`">
      <Hint :Title="item.title" :Message="item.message" :Hint="item.hint" class="hint" :style="`top: ${120 * index + 10}px`" />
    </template>
    <Header />
    <SideBar />
    <router-view />
    <Footer />
    <Chat />
  </div>
</template>

<style lang="scss" scoped>
.hint {
  transition: all 0.2s ease;
}
</style>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import mitt from "@/library/global/Mitt";
import Finger from "@/library/global/Finger";
import Cookies from "js-cookie";

export default defineComponent({
  setup() {
    const store = useStore();
    const hint = computed(() => { return store.getters["Component/GetHint"] })

    const setWidth = () => {
      store.dispatch("Global/SetWidth", window.innerWidth);
    };

    const checkLogin = () => {
      const userInfoStr = Cookies.get("user");
      const walletInfoStr = Cookies.get("wallet");
      if (userInfoStr && walletInfoStr) {
        try {
          const userInfo = JSON.parse(userInfoStr);
          const wallet = JSON.parse(walletInfoStr);
          store.dispatch("User/SetUserFromCookies", { userInfo: userInfo, wallet: wallet, });
          store.dispatch("User/SetStatus", true);
        } catch {
          console.log("parse fail");
        }
      }
    };

    const closeAll = () => {
      mitt.emit("close");
    };

    Finger.Create();
    window.addEventListener("resize", setWidth);

    setWidth();
    checkLogin();

    return { closeAll, hint };
  },
});
</script>
