<template>
  <div>
    <div class="header">
      <div class="sidbar-control" @click="controlSideBar(!SideBar)">
        <icon :icon="['fas', 'align-justify']" class="fa-lg" />
      </div>
      <div class="title">
        <h2>ZBDigital</h2>
      </div>
      <div class="control">
        <div>Best Experts</div>
        <span>|</span>
        <div>Today’s Best Deals</div>
        <span>|</span>
        <div>Promotions</div>
        <span>|</span>
        <div @click.stop="openSubControl('Feeback')">Feeback</div>
        <span>|</span>
        <div @click.stop="openSubControl('Customer')">Customer Services</div>
      </div>
      <div class="login-content">
        <h2 v-if="!Status" class="login" @click="login()">Login</h2>
        <h2 v-else class="user">
          {{ User.Name }} <icon :icon="['fas', 'angle-down']" />
        </h2>
      </div>
    </div>
    <transition name="sub">
      <div v-if="show" class="sub-control" @click.stop="">
        <div class="control-content">
          <div v-for="item in HeaderControl[currentControl]" :key="item">
            {{ item }}
          </div>
        </div>
        <div class="close">
          <span @click="closeSubControl()">✕</span>
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
import { HeaderControl } from "@/config/application/HeaderControl";
import mitt from "@/library/global/Mitt"
export default defineComponent({
  setup() {
    const store = useStore()
    const Status = computed(() => store.getters['User/GetStatus'])
    const User = computed(() => store.getters['User/GetUserInfo'])
    const SideBar = computed(() => store.getters['Component/GetSideBar'])
    const Width = computed(() => store.getters["Global/GetWidth"]);
    let show = ref<boolean> (false);
    let currentControl = ref<string> ("");

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

    mitt.on("close", closeSubControl)

    watch(
      () => { return Status },
      () => { console.log(Status) }
    )

    watch(
      () => { return Width.value },
      () => { if (Width.value < 868) closeSubControl() }
    )

    return { HeaderControl, Status, User, SideBar, show, currentControl, openSubControl, closeSubControl, login, controlSideBar };
  },
});
</script>