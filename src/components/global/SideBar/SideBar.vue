<template>
  <div>
    <div v-if="SideBar" class="backdrop" @click="controlSideBar(false)" />
    <div class="sidebar" :open="SideBar">
      <div class="login side-item">
        <h3 v-if="!Status" @click="login">Login</h3>
        <div v-else>
          <div class="user">
            <h3 >{{ User.Name }}</h3>
            <div class="logout" @click="Logout"><icon :icon="['fas', 'right-from-bracket']" /></div>
          </div>
          <div class="wallet">
            <div><icon :icon="['fas', 'coins']" class="fa-lg" /> {{ Wallet.Point }}</div>
            <div><icon :icon="['fas', 'crown']" class="fa-lg" /> {{ Wallet.Subscriber }}</div>
          </div>
        </div>
      </div>
      <hr />
      <div class="side-item"><h4>Experts</h4></div>
      <div class="side-item"><h4>Today’s Best Deals</h4></div>
      <div class="side-item"><h4>Promotions</h4></div>
      <div class="side-item dropdown">
        <h4>Feeback</h4>
        <icon :icon="['fas', 'angle-down']" class="fa-lg" />
      </div>
      <div class="side-item dropdown">
        <h4>Customer Services</h4>
        <icon :icon="['fas', 'angle-down']" class="fa-lg" />
      </div>
      <div class="side-item dropdown">
        <h4>Language</h4>
        <icon :icon="['fas', 'angle-down']" class="fa-lg" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.backdrop {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: #0f111070;
  z-index: 1;
}
.sidebar {
  position: fixed;
  height: 100vh;
  width: 250px;
  left: -250px;
  background-color: #0f1110;
  z-index: 1;
  transition: left 0.25s ease;

  .side-item {
    display: flex;
    color: #dedede;
    padding-inline: 15px;
    align-items: center;
    h3,
    h4 {
      margin-block: 10px;
      text-align: left;
    }
  }
  hr {
    width: calc(100% - 20px);
    opacity: 0.8;
  }
  .dropdown {
    justify-content: space-between;
  }
}
.login {
  & > div {
    width: 100%;
  }
}
.sidebar[open="true"] {
  left: 0px;
}
.user {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logout {
  padding: 5px;
}
.wallet {
  display: flex;
  div {
    min-width: 30%;
    font-size: 12px;
    &:nth-child(2) {
      padding-left: 3px;
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useStore } from 'vuex'
import Logout from '@/library/global/Logout'
export default defineComponent({
  setup() {
    const store = useStore();
    const Status = computed(() => store.getters['User/GetStatus'])
    const User = computed(() => store.getters['User/GetUserInfo'])
    const Wallet = computed(() => store.getters['User/GetWallet'])
    const SideBar = computed(() => store.getters['Component/GetSideBar'])
    const Width = computed(() => store.getters['Global/GetWidth'])

    const controlSideBar = (status: boolean) => {
      store.dispatch("Component/SetSideBar", status)
    }
    const login = () => {
      controlSideBar(false)
      store.dispatch("Component/SetSingin", {status: true, component: "Login"})
    };

    watch(
      () => { return Width },
      () => { if (Width.value > 868) controlSideBar(false) }
    )

    return { SideBar, Status, User, Wallet, controlSideBar, login, Logout }
  }
})
</script>