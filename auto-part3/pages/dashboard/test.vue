<template>
  <el-container>
    <el-col :span="24" class="idev-page">
      <el-row>
        <page-header
          title="Dashboard"
          :items="bcItems"
        ></page-header>
        <page-actions>
          <i-btn
            text="Prev"
            prepend-icon="angle-left"
          />
          <i-btn
            type="primary"
            text="Prev"
          />
          <i-btn
            type="primary"
            circle
            append-icon="plus"
          />
        </page-actions>
        <el-table
          :data="tableData.tableList"
          style="width: 100%"
        >
          <el-table-column
            v-for="v in tableData.tableColumns"
            :key="v.key"
            :prop="v.key"
            :label="v.label"
            :width="v.width"
          ></el-table-column>
          <template slot="append">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000"
            />
          </template>
        </el-table>
      </el-row>
    </el-col>
  </el-container>
</template>

<script>
  import {mapState} from 'vuex'
  import {
    Table,
    TableColumn,
    Pagination
  } from 'element-ui'

  export default {
    async fetch({store}) {
      await store.dispatch('getStartContent')
    },
    computed: {
      ...mapState(['menu']),
      bcItems(){
        return [
          { title: 'Users', to: {name: 'edu_list'} },
          { title: 'Create', disabled: true }
        ]
      },
      tableData(){
        let arr = []
        for (let i = 0; i <= 25; i++){
          arr.push({
            name: 'Дилик Пулатов',
            type: {value: 'admin', text: 'Администратор'},
            phone: '+998 97 229-24-99',
            email: 'dev@dilikpulatov.com',
            country: 'Узбекистан',
            city: 'г.Ташкент',
            address: 'Юнусабадский район, квартал 4',
            status: {value: 'active', text: 'Активный'},
            create_at: '2020, 12-декабря',
          })
        }
        return {
          tableColumns: [
            { key: 'name', type: 'text', label: 'Name' },
            { key: 'type', type: 'badge', label: 'Type' },
            { key: 'phone', type: 'text', label: 'Phone number', width: 180 },
            { key: 'email', type: 'text', label: 'E-mail', width: 180 },
            { key: 'country', type: 'text', label: 'Country' },
            { key: 'city', type: 'text', label: 'City' },
            { key: 'address', type: 'text', label: 'Address', width: 240 },
            { key: 'status', type: 'badge', label: 'Status' },
            { key: 'create_at', type: 'badge', label: 'Create At' },
          ],
          tableList: arr
        }
      }
    },
    components: {
      pageTable: () => import('@/components/page-table'),
      pageActions: () => import('@/components/page-actions'),
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Pagination.name]: Pagination
    }
  }
</script>
