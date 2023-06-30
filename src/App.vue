<template>
  <div>
    <h1>svg测试</h1>
    <svg>
      <use xlink:href="#icon-ljnttt"></use>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  }
})
</script>

<style scoped lang="scss">
  div{
    h1{
      color: $color;
    }
  }
</style>