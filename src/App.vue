<template>
  <div>
    <h1>测试axios二次封装</h1>
  </div>
</template>

<script lang="ts">
import request from '@/utils/request'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  setup() {
    onMounted(() => {
      request({
        url: '/user/login',
        method: 'post',
        data: {
          username: 'admin',
          password: '111111'
        }
      }).then(res => {
        console.log(res);
      })
    })
    return {}
  }
})
</script>

<style scoped></style>