<template>
  <div>
    <HotGame v-if="Width > 868"/>
    <transition name="login">
      <div v-if="ISingin.status">
        <ISingin />
      </div>
    </transition>
    <AdvBar />
    <div class="content">
      <ControlBar />
      <div class="main">
        <div class="scroll">
          <Live class="content-data" />
          <Footer />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_scroll.scss";
@import "@/styles/_common.scss";

@include mixin-phone {
  .content {
    width: calc(100vw - 30px);
    min-height: calc(100vh - 165px);
    padding-top: 20px;
  }
  .scroll {
    height: calc(100vh - 140px) !important;
  }
}

@include mixin-pc {
  .content {
    width: calc(100vw - 230px);
    min-height: calc(100vh - 300px);
  }
}

.content {
  padding-inline: 20px 10px;
}

.main {
    height:100%;

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
import { computed, defineComponent, defineAsyncComponent, ref, provide } from "vue";
import { useStore } from "vuex";
import { TFunc, TInputFunc } from "@/type/Global"
import { UseEraserFunc, UsePenFunc, UseFontFunc, ChangeColorFunc, ChangeSizeFunc} from "@/symbols/Home"
export default defineComponent({
  components: {
    ControlBar: defineAsyncComponent(() => import("@/components/home/ui/ControlBar.vue")),
    Live: defineAsyncComponent(() => import("@/components/home/page/Live.vue")),
    AdvBar: defineAsyncComponent(() => import("@/components/advBar/AdvBar.vue"))
  },
  setup() {
    const store = useStore();
    const ISingin = computed(() => store.getters["Component/GetSingin"]);
    const Width = computed(() => store.getters["Global/GetWidth"]);

    let eraser = ref<boolean>(false);
    let pen = ref<boolean>(true);
    let font = ref<boolean>(false);
    const resetUse = () => {
      eraser.value = false
      pen.value = false
      font.value = false
    }
    const useEraser: TFunc = () => {
      resetUse();
      eraser.value = true;
    }
    const usePen: TFunc = () => {
      resetUse();
      pen.value = true;
    }
    const useFont: TFunc = () => {
      resetUse();
      font.value = true;
    }
    provide("eraser", eraser)
    provide("pen", pen)
    provide("font", font)
    provide(UseEraserFunc, useEraser)
    provide(UsePenFunc, usePen)
    provide(UseFontFunc, useFont)
    
    let color = ref<string>("#FFFFFF");
    let size = ref<number>(4);
    const changeColor: TInputFunc<string> = (newColor: string) => {
      color.value = newColor
    }
    const changeSize: TInputFunc<number> = (newSize: number) => {
      size.value = newSize
    }
    provide("color", color)
    provide("size", size)
    provide(ChangeColorFunc, changeColor)
    provide(ChangeSizeFunc, changeSize)

    return { ISingin, Width };
  },
});
</script>