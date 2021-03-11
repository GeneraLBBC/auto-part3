<template>
  <content-form/>
</template>

<script>
  export default {
    name: "create",
    components: {
      contentForm: () => import("./fields")
    }
  }
</script>

