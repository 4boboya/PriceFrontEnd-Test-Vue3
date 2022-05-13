<template>
  <div class="footer">
    <div class="type">
      <div>{{ t("Footer.Help") }}</div>
      <div>{{ t("Footer.Feeback") }}</div>
      <div>{{ t("Footer.Promotions") }}</div>
      <div>{{ t("Footer.Policy") }}</div>
      <div>{{ t("Footer.About") }}<span class="pc-show">{{ t("Footer.Us") }}</span></div>
    </div>
    <div class="copy">
      <h3>Copy Right © 2021 zbdigital</h3>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/_common.scss";
.footer {
  height: 104px;
  border-top: 1px solid #c4c4c430;
  color: #dedede;
  margin-top: 20px;
}

@include mixin-phone {
  .footer {
    width: calc(100vw - 30px);
    font-size: 8px;
  }
  .type {
    padding: 20px 10px !important;
  }
  .pc-show {
    display: none;
  }
}
@include mixin-pc {
  .footer {
    width: calc(100vw - 230px);
  }
}
.type {
  display: flex;
  justify-content: space-between;
  padding: 20px 50px;
  & > div {
    cursor: pointer;
  }
  & > div:hover {
    transform: scale(1.1);
  }
}
.copy {
  display: flex;
  justify-content: center;
  align-items: center;

  h3 {
    margin: unset;
  }
}
</style>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
export default defineComponent({
  setup() {
    const store = useStore();
    const { t } = useI18n()
    const Width = computed(() => store.getters["Global/GetWidth"])

    return { t, Width }
  },
});
</script>