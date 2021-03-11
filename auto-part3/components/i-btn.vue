<template>
  <button
    :class="btnClass"
    @click="handleClick"
    :disabled="disabled || loading"
    type="button"
  >
    <icon v-if="!!prependIcon || loading" :icon="loading ? 'spinner-third fa-spin' : prependIcon" :left="!circle"/>
    <span v-if="!!text" class="btn-content">{{ text }}</span>
    <icon v-if="!!appendIcon && !loading" :icon="appendIcon" :right="!circle"/>
  </button>
</template>

<script>
  export default {
    name: "i-btn",
    props: {
      type: {
        type: String,
        default: 'default'
      },
      text: String,
      disabled: Boolean,
      loading: Boolean,
      circle: Boolean,
      small: Boolean,
      prependIcon: String,
      appendIcon: String
    },
    computed: {
      btnClass(){
        return {
          'btn': true,
          'el-button': true,
          [`el-button--${this.type}`]: true,
          'is-disabled': this.disabled,
          'is-circle': this.circle,
          'el-button--small': this.small
        }
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  }
</script>
