<template>
  <el-col :span="24" class="idev-page">
    <el-row>
      <page-header></page-header>
    </el-row>
    <nuxt-child></nuxt-child>
  </el-col>
</template>

<script>
  export default {
    name: "layout",
    async fetch ({ store }) {
      await store.dispatch('user/getOptions')
    }
  }
</script>
