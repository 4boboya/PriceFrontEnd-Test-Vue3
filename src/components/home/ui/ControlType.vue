<template>
  <div class="control-type">
    <template v-if="Width > 868">
      <div :active="page == 'Live'" @click="page = 'Live'">{{ t("Home.Live") }}</div>
      <span>|</span>
      <div :active="page == 'Analysis'" @click="page = 'Analysis'">
        {{ t("Home.Analysis") }}
      </div>
      <span>|</span>
      <div :active="page == 'Forums'" @click="page = 'Forums'">{{ t("Home.Forums") }}</div>
      <span>|</span>
      <div :active="page == 'Results'" @click="page = 'Results'">{{ t("Home.Results") }}</div>
    </template>
    <template v-else>
      <div v-show="!Memo" class="control-type-list" @click.stop="showList = !showList">
        {{ page }}
      </div>
      <transition name="gametype">
        <div v-if="showList" class="type-options">
          <div @click="page = 'Live'; showList = false">{{ t("Home.Live") }}</div>
          <div @click="page = 'Analysis'; showList = false">{{ t("Home.Analysis") }}</div>
          <div @click="page = 'Results'; showList = false">{{ t("Home.Results") }}</div>
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
import { defineComponent, computed, ref, inject } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
import mitt from "@/library/global/Mitt"

export default defineComponent({
  setup() {
    const store = useStore();
    const { t } = useI18n()
    const Width = computed(() => store.getters["Global/GetWidth"]);
    const Memo = computed(() => store.getters["Component/GetMemo"])
    let page = inject("page");
    let showList = ref<boolean>(false);
    
    const closeAll = () => {
      showList.value = false
    }

    mitt.on("close", closeAll)

    return { Width, Memo, t, page, showList }
  },
});
</script>