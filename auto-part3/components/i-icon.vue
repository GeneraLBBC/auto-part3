<template>
  <i :class="classText"></i>
</template>

<script>
  export default {
    name: 'i-icon',
    props: {
      icon: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'fal'
      },
      left: Boolean,
      right: Boolean
    },
    computed: {
      classText(){
        let a = ''
        if (this.left) {
          a = ' icon--left'
        }
        if (this.right) {
          a = ' icon--right'
        }
        return `icon ${this.type} fa-${this.icon}${a}`
      }
    }
  }
</script>
