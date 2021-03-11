<template>
  <el-container class="auth theme-light">
    <nuxt></nuxt>
  </el-container>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    auth: false,
    watch: {
      messages(val){
        this.getFlashes(val,5000)
      }
    },
    computed: {
      ...mapState([
        'messages'
      ])
    }
  }
</script>
<style lang="stylus" src="@/assets/auth.styl"></style>
