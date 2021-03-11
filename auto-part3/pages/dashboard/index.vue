<template>
  <div class="container">
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus atque debitis delectus dolorum, eos esse exercitationem fugit laboriosam laudantium minus mollitia non officiis possimus quisquam reiciendis rerum similique sit sunt suscipit unde voluptate!</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    async fetch({ store }){
      await store.dispatch('getStartContent')
    },
    computed: {
      ...mapState(['menu'])
    }
  }
</script>
