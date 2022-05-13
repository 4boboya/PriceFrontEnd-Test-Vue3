<template>
  <table>
    <thead>
      <tr>
        <th v-for="item in head" :key="item.key">
          {{ item.name }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in body" :key="index">
        <td v-for="item2 in head" :key="item2.key">
          {{ item[item2.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
  color: var(--main-font);
  border-collapse: collapse;
  thead {
    tr {
      border-bottom: 1px solid var(--white-border);
    }
  }
}
</style>

<script lang="ts">
import { defineComponent, PropType, Ref, toRefs } from 'vue'
import { IThead } from "@/type/Global"

export default defineComponent({
  props: {
    Thead: Array as PropType<Array<IThead>>,
    Tbody: {
      type: Array as PropType<Array<any>>,
      default: [] as Array<any>,
    }
  },
  setup(props) {
    const head = toRefs(props).Thead as Ref<Array<IThead>>
    const body = toRefs(props).Tbody as Ref<Array<any>>

    return { head, body }
  },
})
</script>
