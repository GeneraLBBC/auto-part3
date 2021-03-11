<template>
  <page-table v-bind="tableData"></page-table>
</template>

<script>
  const MODULE_KEY = 'user'
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  export default {
    name: 'index',
    computed: {
      ...mapState(MODULE_KEY, ['options', 'filters', 'list', 'labels', 'pagination']),
      tableData(){
        return {
          pageActions: [
            { type: "primary", text: this.$t(`${MODULE_KEY}.create`), to: {name: `${MODULE_KEY}_create`}, prependIcon: 'plus' }
          ],
          updateRoute: {name: `${MODULE_KEY}_update`},
          viewRoute: {name: `${MODULE_KEY}_view`},
          tableColumns: this.labels,
          tableList: this.list,
          filter: true,
          filterItems: {
            status: null,
            type: null,
            date_from: null,
            date_to: null,
            ...this.filters
          },
          filterColumns: {
            status: {
              type: 'select',
              list: this.options.status
            },
            type: {
              type: 'select',
              list: this.options.type
            },
            date_from: {
              type: 'date'
            },
            date_to: {
              type: 'date'
            }
          },
          paginationParams: this.pagination,
          ...mapActions(MODULE_KEY, [
            'getContents',
            'deleteContent'
          ]),
          ...mapMutations(MODULE_KEY, ['setFields'])
        }
      }
    },
    components: {
      pageTable: () => import('@/components/page-table')
    }
  }
</script>
