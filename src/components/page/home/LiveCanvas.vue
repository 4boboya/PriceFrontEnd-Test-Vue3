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


<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from "vuex"
export default defineComponent({
  setup() {
    const store = useStore();
    let Memo = computed(() => { return store.getters["Component/GetMemo"] });
    let inputContent = ref<string>("");
    let drawing = ref<boolean>(false);
    let mouseX = ref<number>(0);
    let mouseY = ref<number>(0);

    const draw = (e: MouseEvent) => {
      if (drawing.value) {

      }
    }
    const beginDrawing = (e: MouseEvent) => {
        
    }
    const stopDrawing = () => {
        
    }

    return { Memo, inputContent }
  }
})
</script>