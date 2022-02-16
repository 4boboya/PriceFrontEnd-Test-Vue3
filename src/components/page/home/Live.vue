<template>
  <div class="live" ref="live-data">
    <div>
      <div v-for="(item, LID) in liveDatas" :key="`oddtable_${LID}`">
        <div v-collapse:check="`${LID}_${Object.keys(liveDatas).indexOf(LID)}`" class="title">{{ Object.values(item)[0].League }}</div>
        <div :id="`col_${LID}_${Object.keys(liveDatas).indexOf(LID)}`" class="table-scroll collapse">
          <div class="div-table">
            <div class="div-tr div-thead">
              <div class="div-td" style="width: 0px; padding-inline: unset"></div>
              <div class="div-td" style="width: 60px"></div>
              <div class="div-td" style="width: 210px"></div>
              <div class="div-td" style="width: 35px"></div>
              <div class="div-td" style="width: 150px">TWSL</div>
              <div class="div-td" style="width: 150px">Bet365</div>
              <div class="div-td" style="width: 150px">Bwin</div>
              <div class="div-td" style="width: 150px">Ku888</div>
              <div class="div-td" style="width: 150px">Betfair</div>
              <div class="div-td" style="width: 150px">Pinnacle</div>
              <div class="div-td">Status</div>
              <div class="div-td" style="width: 100px"></div>
            </div>
            <div
              class="div-tr div-tbody"
              v-for="item2 in item"
              :key="`oddtr_${item2.GameID}`"
            >
              <div class="div-td">
                <div>
                  <div>{{ item2.GameDate }}</div>
                  <div>{{ item2.GameTime }}</div>
                </div>
              </div>
              <div class="div-td">
                <div class="odd">
                  <div>{{ item2.TeamH }}</div>
                  <div></div>
                  <div>{{ item2.TeamA }}</div>
                </div>
              </div>
              <div class="div-td">
                <div class="odd">
                  <div>{{ item2.ScoreH }}</div>
                  <div></div>
                  <div>{{ item2.ScoreA }}</div>
                </div>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['twsl']"></Odd>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['bet365.com']"></Odd>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['bwin.com']"></Odd>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['ku888']"></Odd>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['betfair.com']"></Odd>
              </div>
              <div class="div-td">
                <Odd :data="item2.Site['pinnacle.com']"></Odd>
              </div>
              <div class="div-td">
                <div>
                  <div v-for="(val, key) in item2.Status" :key="`${item2.GameID}_${key}`">
                    <span style="white-space: nowrap;"> {{val}} </span>
                  </div>
                </div>
              </div>
              <div class="div-td">
                <div>
                  <div class="link">
                    <span>Live</span>
                  </div>
                  <div class="link">
                    <span>Tread</span>
                  </div>
                  <div class="link">
                    <span>Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/style/_live.scss";
@import "@/style/_common.scss";
@include mixin-phone {
  .title {
    font-size: 12px;
  }
}
.live {
  position: relative;
  overflow-x: hidden;
}

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

    return { Memo }
  }
})
</script>