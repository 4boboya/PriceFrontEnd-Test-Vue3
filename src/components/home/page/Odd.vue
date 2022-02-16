<template>
<!-- 完全沒odd -->
    <div
      v-if="
        (gameData['HA']?.value.spread == undefined) &&
        (gameData['1X2']?.value.spread == undefined) &&
        (gameData['OU']?.value.spread == undefined)
      "
      class="odd"
    >
      <div></div>
      <div>N/A</div>
      <div></div>
    </div>
<!-- HA為負 -->
    <div v-else-if="(gameData['HA']?.value.spread != undefined) && gameData['HA']?.value.spread.indexOf('-') == 0" class="odd">
      <div v-if="gameData['OU']?.value.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["OU"].value.spread }}</div>
        <div>
          {{ gameData["OU"].value.o }} /
          {{ gameData["OU"].value.u }}
        </div>
      </div>
      <div v-if="gameData['1X2']?.value.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["1X2"].value.spread }}</div>
        <div>
          {{ gameData["1X2"].value.h }} /
          {{ gameData["1X2"].value.a }}
        </div>
      </div>
      <div>
        <div>{{ gameData["HA"]?.value.spread.substring(1) }}</div>
        <div>
          {{ gameData["HA"].value.h }} /
          {{ gameData["HA"].value.a }}
        </div>
      </div>
    </div>
<!-- HA為正 -->
    <div v-else class="odd">
      <div v-if="gameData['HA']?.value.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["HA"].value.spread }}</div>
        <div>
          {{ gameData["HA"].value.h }} /
          {{ gameData["HA"].value.a }}
        </div>
      </div>
      <div v-if="gameData['1X2']?.value.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["1X2"].value.spread }}</div>
        <div>
          {{ gameData["1X2"].value.h }} /
          {{ gameData["1X2"].value.a }}
        </div>
      </div>
      <div v-if="gameData['OU']?.value.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["OU"].value.spread }}</div>
        <div>
          {{ gameData["OU"].value.o }} /
          {{ gameData["OU"].value.u }}
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_live.scss";
</style>

<script lang="ts">
import { defineComponent, toRefs, Ref } from 'vue'
import { IGameData } from "@/type/Live"
export default defineComponent({
  props: {
    data: {} as IGameData
  },
  setup(props) {
    const gameData = toRefs((toRefs(props).data as Ref<IGameData>).value)
    
    return { gameData }
  }
})
</script>
