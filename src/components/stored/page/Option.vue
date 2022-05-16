<template>
  <div>
    <Table :Thead="StoredOption" :Tbody="[]">

    </Table>
    <button @click="nextStep">next</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { StoredOption } from "@/config/application/Thead"

export default defineComponent({
  setup(_, { emit }) {
    const nextStep = () => {
      emit("next", "method")
    }

    return { StoredOption, nextStep }
  },
})
</script>
