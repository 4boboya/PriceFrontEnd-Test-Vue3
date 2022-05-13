<template>
  <div class="chat" :show="show">
    <div class="chat-title" @click.stop="control()">Chat Room</div>
    <div class="chat-content" @click.stop="">
      <div class="chat-message">
        <div>aaa:fff</div>
        <div>aaa:fff</div>
        <div>aaa:fff</div>
        <div>aaa:fff</div>
        <div>aaa:fff</div>
      </div>
      <hr />
      <div class="chat-input">
        <textarea />
        <button v-if="show" class="submit" @click="submit()">
          <icon :icon="['far', 'paper-plane']" class="fa-lg" />
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  position: fixed;
  bottom: -10px;
  right: 30px;
  transition: all 0.2s ease;

  .chat-title {
    cursor: default;
    background-color: var(--minor-color);
    opacity: 0.7;
    height: 35px;
    width: 200px;
    line-height: 35px;
    padding-inline: 30px;
    font-weight: bold;
    color: var(--main-font);
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }

  .chat-input {
    position: relative;
  }

  .chat-content {
    height: 0px;
    padding: 5px 10px;
    background-color: #0f1110;
    transition: height 0.2s ease;
  }

  .chat-message {
    height: 300px;
    color: var(--main-font);
  }

  textarea {
    resize: none;
    width: 190px;
    height: 70px;
    border-radius: 5px;
    padding-right: 45px;
    background-color: #ffffff10;
    color: var(--main-font);
  }

  .submit {
    cursor: pointer;
    position: absolute;
    right: 10px;
    bottom: 30px;
    background-color: transparent;
    color: var(--minor-font);
    outline: unset;
    border: unset;
    padding: 5px;

    svg {
      transition: all 0.2s ease;
    }

    &:hover {
      animation: hover-dowm 0.3s linear;

      svg {
        filter: drop-shadow(1px 1px 5px #b2ce8e);
      }
    }
  }
}

.chat[show="true"] {
  bottom: 10px;
  box-shadow: 1.5px 1.5px 15px var(--main-shadow);

  .chat-title {
    opacity: 1;
  }
  .chat-content {
    height: 400px;
    background-color: var(--bg-color);;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import mitt from "@/library/global/Mitt"
export default defineComponent({
  setup() {
    let show = ref<boolean>(false);

    const control = () => {
      show.value = !show.value;
    };

    const submit = () => {
      console.log(123);
    };

    const closeAll = () => {
      show.value = false
    }

    mitt.on("close", closeAll)

    return { show, control, submit };
  },
});
</script>