<template>
  <el-col :span="24" class="idev-page-header">
    <h1>{{ title }}</h1>
    <ul class="idev-breadcrumbs">
      <li>
        <n-link :to="homeLink">
          <icon icon="home" type="fa"/>
          {{ $t('home') }}
        </n-link>
      </li>
      <li
        v-for="(v, i) in items"
        :key="`bc_${i}`"
      >
        <n-link
          :to="hasFields(v,'to') ? v.to : homeLink"
          :class="{item: true, disabled: !hasFields(v,'to')}"
        >
          <icon icon="angle-right" type="fa"/>
          {{ v.title }}
        </n-link>
      </li>
    </ul>
  </el-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "page-header",
  data(){
    return {
      items: [],
      title: ''
    }
  },
  computed: {
    ...mapState(['homeLink']),
    links(){
      return {
        user_list: [
          { title: this.$t('user.title') }
        ],
        user_deleted: [
          { title: this.$t('user.deleted') }
        ],
        user_create: [
          { title: this.$t('user.title'), to: {name: 'user_list'} },
          { title: this.$t('user.create')},
        ],
        user_update: [
          { title: this.$t('user.title'), to: {name: 'user_list'} },
          { title: this.$t('user.update')},
        ],
        user_view: [
          { title: this.$t('user.title'), to: {name: 'user_list'} },
          { title: this.$t('user.view')},
        ],
      }
    }
  },
  watch: {
    $route() {
      this.updateItems()
    }
  },
  methods: {
    updateItems(){
      const r = this.$route
      this.items = this.hasFields(this.links, r.name) ? this.links[r.name] : []
      if (this.items.length > 0) {
        this.title = this.items[(this.items.length - 1)].title
      }
    }
  },
  mounted() {
    this.updateItems()
  }
}
</script>
