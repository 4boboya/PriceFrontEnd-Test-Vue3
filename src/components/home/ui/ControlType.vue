<template>
  <div class="control-type">
    <template v-if="Width > 868">
      <div :active="page == 'Live'" @click="page = 'Live'">Live</div>
      <span>|</span>
      <div :active="page == 'Analysis'" @click="page = 'Analysis'">
        Analysis & Predictions
      </div>
      <span>|</span>
      <div :active="page == 'Forums'" @click="page = 'Forums'">Forums</div>
      <span>|</span>
      <div :active="page == 'Results'" @click="page = 'Results'">Results</div>
    </template>
    <template v-else>
      <div v-show="!Memo" class="control-type-list" @click="showList = !showList">
        {{ current }}
      </div>
      <transition name="gametype">
        <div v-if="showList" class="type-options">
          <div @click="current = 'Live'">Live</div>
          <div @click="current = 'Analysis'">Analysis & Predictions</div>
          <div @click="current = 'Results'">Results</div>
        </div>
      </transition>
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_home.scss";
@import "@/styles/_common.scss";

@include mixin-phone {
  .control-type {
    align-items: unset !important;
  }
}
@include mixin-pc {
  .control-type > div {
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
    &[active="true"] {
      transform: scale(1.1);
      font-weight: 600;
    }
  }
}

.control-type {
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 20px;
  color: #dedede;

  span {
    padding-inline: 10px;
  }
}

.control-type-list {
  display: flex;
  align-items: center;
  margin-right: 20px;
  color: #dedede;
  cursor: pointer;
  padding-inline: 10px;
  margin-block: 5px;
  border-radius: 5px;
  box-shadow: 1.5px 1.5px 4px #00000090 inset;
}

.type-options {
  @extend %option-extend;
  width: 170px;
  left: 5px;
}
</style>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    const Width = computed(() => { return store.getters["Global/GetWidth"] });
    const Memo = computed(() => { return store.getters["Component/GetMemo"]})
    let page = ref<string>("Live");
    let current = ref<string>("Live");
    let showList = ref<boolean>(false);
    
    return { Width, Memo, page, current, showList }
  },
});
</script>