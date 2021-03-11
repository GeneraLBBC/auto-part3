<template>
  <n-link
    :to="localePath(to)"
    :class="btnClass"
    :disabled="disabled"
  >
    <icon v-if="!!prependIcon" :icon="prependIcon" left/>
    <span class="btn-content">{{ text }}</span>
    <icon v-if="!!appendIcon" :icon="appendIcon" right/>
  </n-link>
</template>

<script>
  export default {
    name: "i-btn-link",
    props: {
      type: {
        type: String,
        default: 'default'
      },
      to: {
        type: [String, Object],
        required: true
      },
      text: String,
      disabled: Boolean,
      prependIcon: String,
      appendIcon: String
    },
    computed: {
      btnClass(){
        return {
          'btn': true,
          'el-button': true,
          [`el-button--${this.type}`]: true,
          'is-disabled': this.disabled
        }
      }
    }
  }
</script>
