<template>
  <div>
    <div class="header">
      <div class="sidbar-control" @click="SetSideBar(!SideBar)">
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
        <div @click="openSubControl('Feeback')">Feeback</div>
        <span>|</span>
        <div @click="openSubControl('Customer')">Customer Services</div>
      </div>
      <div class="login-content">
        <h2 v-if="!Status" class="login" @click="login()">Login</h2>
        <h2 v-else class="user">
          {{ User.Name }} <icon :icon="['fas', 'angle-down']" />
        </h2>
      </div>
    </div>
    <transition name="sub">
      <div v-if="show" class="sub-control">
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
import { defineComponent, ref } from "vue";
import { useStore } from "vuex"
import { HeaderControl } from "@/config/application/HeaderControl";
export default defineComponent({
  setup() {
    const store = useStore()
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

    return { HeaderControl, show, currentControl, openSubControl, login };
  },
});
</script>