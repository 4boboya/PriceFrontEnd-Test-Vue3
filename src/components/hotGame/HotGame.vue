<template>
  <div
    class="hotgame"
    :ref="(el) => { carousel = el}"
    @mousedown="mousedown"
    @mousemove="mousemove"
    @mouseup="mouseup"
  >
    <div class="carousel">
      <div
        class="hotgame-card"
        v-for="(item, key) in hotGameDatas"
        :key="`hotgame_${key}`"
      >
        <div class="hotgame-league">{{ item.League }}</div>
        <div class="hotgame-team">
          <div :ref="`${item.GameID}`" class="hotgame-team-h" :title="item.TeamH">{{ item.TeamH }}</div>
          <div class="hotgame-score">{{ item.ScoreH }} : {{ item.ScoreA }}</div>
          <div :ref="`${item.GameID}`" class="hotgame-team-a" :title="item.TeamA">{{ item.TeamA }}</div>
        </div>
        <div>{{ item.GameDate }} {{ item.GameTime }}</div>
        <div class="hotgame-analysis">
          <div>Analysis</div>
          <div>Prediction</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin hotgame-team-mixin($team) {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @if ($team == "H") {
    text-align: left;
  } @else if ($team == "A") {
    text-align: right;
  } @else {
    text-align: center;
  }
}
.hotgame {
  width: calc(100vw - 40px);
  height: 95px;
  padding: 10px 20px;
  background-color: transparent;
  overflow-x: auto;
  user-select: none;

  &::-webkit-scrollbar {
    background-color: transparent;
    height: 0px;
  }
}

.carousel {
  display: flex;
  align-items: flex-start;
  grid-gap: 20px;
}

.hotgame-card {
  height: 90px;
  min-width: 300px;
  border-radius: 5px;
  border-left: 2px solid var(--minor-border);
  color: var(--main-font);
  background-color: var(--bg-card);
  padding: 2.5px 15px;
  box-shadow: 1.5px 1.5px 4px var(--main-shadow);
  font-size: 13px;

  & > div {
    display: flex;
    height: 25%;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  & > div.hotgame-team {
    justify-content: space-between;

    .hotgame-score { 
      white-space: nowrap;
      padding-inline: 7px;
    }
  }

  & > div.hotgame-analysis {
    display: flex;
    div:nth-child(1) {
      margin-right: 20px;
    }
    div:nth-child(2) {
      margin-left: 20px;
    }
  }
}

.hotgame-league {
  font-weight: bold;
}

.hotgame-team-h {
  @include hotgame-team-mixin("H");
}

.hotgame-team-a {
  @include hotgame-team-mixin("A");
}
</style>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex"
import { HotGame } from "@/api/home"
import { tidyData, tidyWSData } from "@/library/HotGame/TidyData"
import Websocket from "@/library/global/Websocket"
import { WSConfig } from "@/config/application/Websocket"
export default defineComponent({
  setup() {
    const store = useStore()
    const wsHotGame = new Websocket();
    const hotGameDatas = computed(() => store.getters["HotGame/GetHotGames"]);
    let isDown = ref<boolean>(false);
    let start = ref<number>(0);
    let carousel =ref<HTMLElement>();
    let scrollLeft = ref<number>(0);

    const getHotGame = async () => {
      await HotGame().then((res) => {
        if (res?.gameDtos) {
          tidyData(res.gameDtos)
        }
      })
      connectWSHotGame()
    }

    const connectWSHotGame = () => {
      wsHotGame.ConnectHub(WSConfig.url, WSConfig.group, "Match_UI", WSConfig.key);
      Object.defineProperty(Websocket, 'ResponseMsg', {
          set: (message: string) => {
            tidyWSData(message)
          }
      })
    }

    const mousedown = (e:MouseEvent) =>  {
      start.value = e.pageX;
      scrollLeft.value = carousel.value?.scrollLeft as number;
      isDown.value = true;
    }

    const mousemove = (e: MouseEvent) =>  {
      if (!isDown.value) return;
      e.preventDefault();
      if (carousel.value) {
        const x = e.pageX - carousel.value?.offsetLeft;
        const walk = (x - start.value) * 2;
        carousel.value.scrollLeft = scrollLeft.value - walk;
      }
    }

    const mouseup = () =>  {
      isDown.value = false;
    }

    getHotGame()

    return { carousel, hotGameDatas, mousedown, mousemove, mouseup }
  },
});
</script>