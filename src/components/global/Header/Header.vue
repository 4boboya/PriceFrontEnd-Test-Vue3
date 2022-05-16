<template>
  <div>
    <div class="header">
      <div class="sidbar-control" @click="controlSideBar(!SideBar)">
        <icon :icon="['fas', 'align-justify']" class="fa-lg" />
      </div>
      <div class="title">
        <h2 @click="toHome">ZBDigital</h2>
      </div>
      <div class="control">
        <div>{{ t("Header.BestExperts") }}</div>
        <span>|</span>
        <div>{{ t("Header.BestDeals") }}</div>
        <span>|</span>
        <div>{{ t("Header.Promotions") }}</div>
        <span>|</span>
        <div @click.stop="openSubControl('Feeback')">{{ t("Header.Feeback") }}</div>
        <span>|</span>
        <div @click.stop="openSubControl('Customer')">{{ t("Header.Customer") }}</div>
        <span>|</span>
        <div @click.stop="openSubControl('Language')">{{ t("Header.Language") }}</div>
      </div>
      <div class="login-content">
        <h2 v-if="!Status" class="login" @click="login()">{{ t("Header.Login") }}</h2>
        <h2 v-else class="user" @click.stop="controlUser(!showUser)">
          {{ User.Name }} <icon :icon="['fas', 'caret-down']" class="fa-xs" />
        </h2>
      </div>
    </div>
    <transition name="sub">
      <div v-if="show" class="sub-control" @click.stop="">
        <div class="control-content">
          <div v-for="item in Object.keys(HeaderControl[currentControl])" :key="item" @click="clickSubItem(HeaderControl[currentControl][item])">
            {{ item }}
          </div>
        </div>
        <div class="close">
          <span @click="closeSubControl()">✕</span>
        </div>
      </div>
    </transition>
    <transition name="usercontrol">
      <div v-if="showUser" class="user-control" @click.stop="">
        <div class="control-content">
          <div class="wallet">
            <div class="uesr-link" title="儲值點數" @click="toStored"><icon :icon="['fas', 'coins']" class="fa-lg" /> {{ Wallet.Point }}</div>
            <div class="uesr-link" title="訂閱會員"><icon :icon="['fas', 'crown']" class="fa-lg" /> {{ Wallet.Subscriber }}</div>
          </div>
          <hr />
          <div v-for="item in UserControl" :key="item.key" class="uesr-link" @click="uesrControl(item.link)">
            {{ t(item.name) }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_header.scss";
</style>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n";
import { HeaderControl, UserControl } from "@/config/application/HeaderControl";
import mitt from "@/library/global/Mitt"
import Logout from '@/library/global/Logout'
export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const { t, locale } = useI18n()
    const Status = computed(() => store.getters['User/GetStatus'])
    const User = computed(() => store.getters['User/GetUserInfo'])
    const Wallet = computed(() => store.getters['User/GetWallet'])
    const SideBar = computed(() => store.getters['Component/GetSideBar'])
    const Width = computed(() => store.getters["Global/GetWidth"]);
    let show = ref<boolean>(false);
    let showUser = ref<boolean>(false);
    let currentControl = ref<string>("");

    const openSubControl = (control: string) => {
      if (control == currentControl.value) {
        closeSubControl();
      } else {
        show.value = true;
        currentControl.value = control;
      }
    };
    const closeSubControl = () => {
        show.value = false;
        currentControl.value = "";
    };
    const login = () => {
      store.dispatch("Component/SetSingin", {status: true, component: "Login"})
    };

    const controlSideBar = (status: boolean) => {
      store.dispatch("Component/SetSideBar", status)
    }

    const controlUser = (status: boolean) => {
      showUser.value = status
    }

    const logout = () => {
      controlUser(false)
      Logout()
    }

    const clickSubItem = (event: string) => {
      switch (currentControl.value) {
        case "Language":
          locale.value = event;
          break;
        case "Customer":
          console.log(`link: ${event}`);
          break;
        case "Feeback":
          console.log(`link: ${event}`);
          break;
      }
    }

    const uesrControl = (action: string) => {
      if (action == 'LogOut') logout()
      else router.push(action)
      controlUser(false)
    }

    const toHome = () => {
      router.push("/")
    }

    const toStored = () => {
      router.push("/stored")
    }

    mitt.on("close", () => {closeSubControl(); controlUser(false)})

    watch(
      () => { return Status },
      () => { console.log(Status) }
    )

    watch(
      () => { return Width.value },
      () => { if (Width.value < 868) closeSubControl() }
    )

    return { HeaderControl, UserControl, Status, User, Wallet, SideBar, t, locale, show, showUser, currentControl, openSubControl, closeSubControl, login, controlSideBar, controlUser, logout, clickSubItem, uesrControl, toHome, toStored };
  },
});
</script>