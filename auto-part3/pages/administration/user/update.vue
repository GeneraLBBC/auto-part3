<template>
  <content-form v-bind="data"/>
</template>

<script>
  const MODULE_KEY = 'user'
  export default {
    name: "update",
    async asyncData({store, params, redirect}) {
      const res = await store.dispatch(`${MODULE_KEY}/getContent`,{id: params.id})
      if (res.success) {
        return {
          data: {
            updateId: parseInt(params.id),
            isContent: res.data.content
          }
        }
      } else {
        redirect({name: `${MODULE_KEY}_list`})
      }
    },
    components: {
      contentForm: () => import("./fields")
    }
  }
</script>
