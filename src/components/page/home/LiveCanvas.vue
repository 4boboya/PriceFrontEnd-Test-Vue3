<template>
  <input type="text" v-model="inputContent" ref="canvas-input" class="canvas-input" />
  <canvas
    v-if="Memo"
    ref="memo-canvas"
    @mousemove="draw"
    @mousedown="beginDrawing"
    @mouseup="stopDrawing"
  />
</template>

<style lang="scss" scoped>
canvas {
  position: absolute;
  z-index: 10;
}

.canvas-input {
  position: absolute;
  z-index: -1;
  background-color: transparent;
  outline: unset;
  border: unset;
}
</style>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from "vuex"
export default defineComponent({
  setup() {
    const store = useStore();
    let Memo = computed(() => { return store.getters["Component/GetMemo"] });
    let inputContent = ref<string>("");
    let drawing = ref<boolean>(false);
    // let mouseX = ref<number>(0);
    // let mouseY = ref<number>(0);

    // const draw = (e: MouseEvent) => {
    //   if (drawing.value) {

    //   }
    // }
    // const beginDrawing = (e: MouseEvent) => {
        
    // }
    // const stopDrawing = () => {
        
    // }

    return { Memo, inputContent }
  }
})
</script>