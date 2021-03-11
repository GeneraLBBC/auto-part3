<template>
  <v-col lg="4">
    <h1>Waiting...</h1>
  </v-col>
</template>

<script>
  export default {
    auth: true,
    methods: {
      userLogOut(){
        this.$router.push({name: "auth_login"})
      }
    },
    mounted() {
      setTimeout(this.userLogOut(),3000)
    }
  }
</script>
