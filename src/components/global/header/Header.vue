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
@import "@/styles/_common.scss";
@include mixin-phone {
  .header {
    padding: 10px 20px;
    width: calc(100vw - 40px);
  }
  .control {
    display: none !important;
  }
  .login-content {
    display: none !important;
  }
}
@include mixin-pc {
  .header {
    padding: 10px 40px;
    width: calc(100vw - 80px);
    justify-content: space-between;
  }
  .sidbar-control {
    display: none;
  }
}
.header {
  height: 59px;
  background-color: #0f111070;
  color: #dedede;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #c4c4c430;
  backdrop-filter: blur(7px);
}
.title {
  color: #618730;
}
.control {
  display: flex;
  justify-content: center;

  & > div {
    cursor: pointer;
  }
  & > div:hover {
    transform: scale(1.1);
  }
  span {
    padding-inline: 10px;
  }
}
.sub-control {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #30363399;
  backdrop-filter: blur(7px);
  color: #dedede;
  overflow: hidden;
  height: 175px;
  z-index: 1;

  .control-content {
    background-color: #0f111050;
    display: grid;
    grid-template-columns: repeat(3, minmax(max-content, 100px));
    justify-content: center;
    padding-block: 10px;
    background-color: transparent;

    & > div {
      padding: 4px 20px;
      cursor: pointer;
    }
    & > div:hover {
      transform: scale(1.03);
    }
  }

  .close {
    position: relative;
  }
  .close span {
    position: absolute;
    top: 7px;
    padding: 3px;
    cursor: pointer;
    font-family: PMingLiU;
  }
}
.login {
  cursor: pointer;
}
.user {
  cursor: pointer;
}
.sidbar-control {
  padding-right: 20px;
}
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