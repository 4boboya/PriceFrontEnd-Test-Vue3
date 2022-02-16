<template>
  <div>
    <HotGame v-if="Width > 868"/>
    <transition name="login">
      <div v-if="Singin.status">
        <Singin />
      </div>
    </transition>
    <div class="content">
      <ControlBar />
      <div class="main">
        <div class="scroll">
          <!-- <Live class="content-data" :save="save" :color="color" :size="size" :eraser="eraser" :pen="pen" :font="font" :clear="clear" @clearDone="clearDone()"/> -->
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
import { Func, InputFunc } from "@/type/Global"
import { UseEraserFunc, UsePenFunc, UseFontFunc, ClearCanvas, SaveCanvas, ChangeColorFunc, ChangeSizeFunc} from "@/symbols/Home"
export default defineComponent({
  components: {
    ControlBar: defineAsyncComponent(() => import("@/components/ui/home/ControlBar.vue")),
  },
  setup() {
    const store = useStore();
    const Singin = computed(() => store.getters["Component/GetSingin"]);
    const Width = computed(() => store.getters["Global/GetWidth"]);

    let eraser = ref<boolean>(false);
    let pen = ref<boolean>(true);
    let font = ref<boolean>(false);
    const resetUse = () => {
      eraser.value = false
      pen.value = false
      font.value = false
    }
    const useEraser: Func = () => {
      resetUse();
      eraser.value = true;
    }
    const usePen: Func = () => {
      resetUse();
      pen.value = true;
    }
    const useFont: Func = () => {
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
    const changeColor: InputFunc<string> = (newColor: string) => {
      color.value = newColor
    }
    const changeSize: InputFunc<number> = (newSize: number) => {
      size.value = newSize
    }
    provide("color", color)
    provide("size", size)
    provide(ChangeColorFunc, changeColor)
    provide(ChangeSizeFunc, changeSize)

    const clear: Func = () => {
      console.log("clear")
    }
    const save: Func = () => {
      console.log("save")
    }
    provide(ClearCanvas, clear)
    provide(SaveCanvas, save)

    return { Singin, Width };
  },
});
</script>