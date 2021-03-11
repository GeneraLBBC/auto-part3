<template>
  <el-col :span="24" class="idev-page-actions">
    <el-row>
      <el-col :span="14" class="actions-left">
        <template v-for="(v, i) in actions">
          <i-btn-link
            v-if="hasFields(v, 'to')"
            v-bind="v"
            :disabled="disabled"
          />
          <i-btn
            v-else
            v-bind="v"
            @click="v.click"
            :disabled="disabled"
          />
        </template>
        <slot
          name="left"
          v-bind="{disabled}"
        ></slot>
      </el-col>
      <el-col :span="10" class="actions-right">
        <slot
          name="right"
          v-bind="{disabled}"
        ></slot>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
  export default {
    name: "page-actions",
    props: {
      actions: {
        type: Array,
        default: () => []
      },
      disabled: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
