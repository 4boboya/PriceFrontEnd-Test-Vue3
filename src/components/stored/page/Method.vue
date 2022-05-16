<template>
  <div>
    <Table :Thead="StoredMethod" :Tbody="[]">

    </Table>
    <button @click="nextStep">next</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { StoredMethod } from "@/config/application/Thead"

export default defineComponent({
  setup(_, { emit }) {
    const nextStep = () => {
      emit("next", "success")
    }

    return { StoredMethod, nextStep }
  },
})
</script>