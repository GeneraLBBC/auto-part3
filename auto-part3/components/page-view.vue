<template>
  <el-row>
    <page-actions
      :actions="actions"
    />
    <el-col :span="24" class="idev-page-view">
      <el-row :gutter="24">
        <el-col
          v-for="(v, i) in content"
          :key="`${v.key}_${i}`"
          :class="`view-item ${v.key}`"
          :span="24"
        >
          <el-row :gutter="24">
            <el-col :span="6">
              <p class="view-label">{{ getLabel(v) }}</p>
            </el-col>
            <el-col :span="18">
              <div class="view-content">
                {{ v.content }}
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'page-view',
    props: {
      id: Number,
      actions: Array,
      content: Array
    },
    components: {
      pageActions: () => import('@/components/page-actions')
    },
    methods: {
      getLabel(item){
        return this.hasFields(item, 'label') ? item.label : this.$t(item.key)
      }
    }
  }
</script>
