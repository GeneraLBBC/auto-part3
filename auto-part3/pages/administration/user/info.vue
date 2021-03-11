<template>
  <page-view
    v-bind="{id, actions, content}"
  />
</template>

<script>
  const MODULE_KEY = 'user'
  export default {
    name: "info",
    async asyncData({store, params, redirect}) {
      const res = await store.dispatch(`${MODULE_KEY}/viewContent`,{id: params.id})
      if (res.success) {
        return {
          id: parseInt(params.id),
          content: res.data.content
        }
      } else {
        redirect({name: `${MODULE_KEY}_list`})
      }
    },
    components: {
      pageView: () => import("@/components/page-view")
    },
    computed: {
      actions(){
        return [
          {
            text: this.$t('prev'),
            to: `${MODULE_KEY}_list`,
            prependIcon: 'angle-left'
          },
          {
            type: 'primary',
            text: this.$t(`${MODULE_KEY}.update`),
            to: {
              name: `${MODULE_KEY}_update`,
              params: {id: this.$route.params.id}
            },
            prependIcon: 'pencil'
          }
        ]
      }
    }
  }
</script>

