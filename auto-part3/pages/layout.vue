<template>
  <el-main>
    <nuxt-child></nuxt-child>
  </el-main>
</template>

<script>
  export default {
    async fetch({ store }){
      await store.dispatch('getStartContent')
    }
  }
</script>
