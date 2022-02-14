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
        v-for="(item, index) in 10"
        :key="`hotgame_${item}_${index}`"
      >
        <div class="hotgame-league">XXX</div>
        <div class="hotgame-team">
          <div :ref="`${item.GameID}`" class="hotgame-team-h">XXX</div>
          <div style="padding-inline: 3px">XXX:XXX</div>
          <div :ref="`${item.GameID}`" class="hotgame-team-a">XXX</div>
        </div>
        <div>XXX XXX</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@mixin hotgame-team-mixin($team) {
  width: 100%;
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
  height: 75px;
  min-width: 300px;
  border-radius: 5px;
  border-left: 2px solid #618730;
  color: #dedede;
  background-color: #343444;
  padding: 10px 15px;
  box-shadow: 1.5px 1.5px 4px #ffffff45;
  font-size: 13px;

  & > div {
    display: flex;
    height: 33%;
    text-align: center;
    align-items: center;
    justify-content: center;
  }
  & > div.hotgame-team {
    justify-content: space-between;
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
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    let isDown = ref<boolean>(false);
    let start = ref<number>(0);
    let carousel =ref<HTMLElement>();
    let scrollLeft = ref<number>(0);
    let hotGameDatas = ref<Array<string>>();

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

    return { carousel, hotGameDatas, mousedown, mousemove, mouseup }
  },
});
</script>