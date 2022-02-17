<template>
<!-- 完全沒odd -->
    <div
      v-if="
        (gameData['HA']?.spread == undefined) &&
        (gameData['1X2']?.spread == undefined) &&
        (gameData['OU']?.spread == undefined)
      "
      class="odd"
    >
      <div></div>
      <div>N/A</div>
      <div></div>
    </div>
<!-- HA為負 -->
    <div v-else-if="(gameData['HA']?.spread != undefined) && gameData['HA']?.spread.indexOf('-') == 0" class="odd">
      <div v-if="gameData['OU']?.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["OU"].spread }}</div>
        <div>
          {{ gameData["OU"].o }} /
          {{ gameData["OU"].u }}
        </div>
      </div>
      <div v-if="gameData['1X2']?.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["1X2"].spread }}</div>
        <div>
          {{ gameData["1X2"].h }} /
          {{ gameData["1X2"].a }}
        </div>
      </div>
      <div>
        <div>{{ gameData["HA"]?.spread.substring(1) }}</div>
        <div>
          {{ gameData["HA"].h }} /
          {{ gameData["HA"].a }}
        </div>
      </div>
    </div>
<!-- HA為正 -->
    <div v-else class="odd">
      <div v-if="gameData['HA']?.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["HA"].spread }}</div>
        <div>
          {{ gameData["HA"].h }} /
          {{ gameData["HA"].a }}
        </div>
      </div>
      <div v-if="gameData['1X2']?.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["1X2"].spread }}</div>
        <div>
          {{ gameData["1X2"].h }} /
          {{ gameData["1X2"].a }}
        </div>
      </div>
      <div v-if="gameData['OU']?.spread == undefined">
        N/A
      </div>
      <div v-else>
        <div>{{ gameData["OU"].spread }}</div>
        <div>
          {{ gameData["OU"].o }} /
          {{ gameData["OU"].u }}
        </div>
      </div>
    </div>
</template>

<style lang="scss" scoped>
@import "@/styles/component/_live.scss";
</style>

<script lang="ts">
import { defineComponent, toRefs, Ref, PropType } from 'vue'
import { IGameData } from "@/type/Game"
export default defineComponent({
  props: {
    data: {} as PropType<IGameData>
  },
  setup(props) {
    const gameData = (toRefs(props).data as Ref<IGameData>)
    return { gameData }
  }
})
</script>
