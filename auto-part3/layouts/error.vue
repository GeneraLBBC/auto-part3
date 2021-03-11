<template>
  <el-row justify="center" align="middle" style="height: 100%">
    <el-col :span="24">
      <icon icon="exclamation-triangle error-icon"/>
      <h1>{{ `${code} - ${$t(`error.${code}`)}` }}</h1>
      <i-btn-link
        :to="homeLink"
        prepend-icon="angle-left"
        :text="$t('back_to_home') "
      />
    </el-col>
  </el-row>
</template>

<script>
  import {mapState} from "vuex";

  export default {
    name: "error",
    layout: "empty",
    auth: false,
    props: {
      error: {
        type: Object,
        default: () => {},
      },
    },
    computed: {
      code(){
        return this.hasFields(this.error,'statusCode') ? this.error.statusCode : 404
      },
      ...mapState(['homeLink'])
    }
  }
</script>

<style lang="stylus">
  .error-icon
    font-size 64px !important
    color #f35b5b
    & + h1
      margin 24px 0
      font-size 28px
</style>
