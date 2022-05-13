<template>
  <div class="record-content">
    <Table :Thead="BuyRecordThead">

    </Table>
  </div>
</template>

<style lang="scss" scoped>
.record-content {
  margin-top: 10px;
  padding-inline: 20px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'
import { BuyRecordThead } from '@/config/application/Thead'

export default defineComponent({
  setup() {
    return { BuyRecordThead }
  },
})
</script>

