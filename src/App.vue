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
import Cookies from "js-cookie";

export default defineComponent({
  setup() {
    const store = useStore();

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

    return { closeAll };
  },
});
</script>
