<template>
  <el-row>
    <page-actions :actions="pageActions">
      <template slot="left">
        <el-popover
          v-model.sync="filterPanel"
          placement="bottom"
          :width="filterWidth"
          trigger="click"
          popper-class="table-filter"
        >
          <el-form
            label-position="top"
            :model="formFilter"
            ref="formFilter"
          >
            <el-row :gutter="24">
              <el-col
                v-for="(v, i) in filterColumns"
                :key="`filter_${i}`"
                :span="getField(v,'col',12)"
              >
                <template v-if="v.type === 'select'">
                  <el-form-item :label="getField(v, 'label', $t(i))">
                    <el-select
                      v-model="formFilter[i]"
                      :placeholder="getField(v, 'placeholder', $t('choose'))"
                      clearable
                    >
                      <el-option
                        v-for="l in v.list"
                        :key="l.value"
                        :label="l.text"
                        :value="l.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </template>
                <template v-if="v.type === 'date'">
                  <el-form-item :label="getField(v, 'label', $t(i))">
                    <el-date-picker
                      v-model="formFilter[i]"
                      type="date"
                      :format="formOptions.date_format_view"
                      :value-format="formOptions.date_format"
                      :placeholder="getField(v, 'placeholder', $t('choose'))"
                    />
                  </el-form-item>
                </template>
              </el-col>
              <el-col :span="24" class="form-actions">
                <i-btn
                  type="primary"
                  prepend-icon="filter"
                  :text="$t('go')"
                  @click="changeFilter()"
                />
                <i-btn
                  prepend-icon="times"
                  :text="$t('clear')"
                  @click="changeFilter(true)"
                />
              </el-col>
            </el-row>
          </el-form>
          <i-btn
            slot="reference"
            :text="$t('filter')"
            prepend-icon="sort-alpha-down"
          />
        </el-popover>
      </template>
      <template slot="right">
        <span class="total-count">{{ $t('total_count', {count: $options.filters.money(paginationParams.total_count)}) }}</span>
      </template>
    </page-actions>
    <el-col :span="24" class="idev-page-table">
      <el-table
        v-loading="loading"
        :data="tableList"
        style="width: 100%"
        height="calc(100vh - 169px)"
      >
        <el-table-column
          type="index"
          width="50"
          label="#"
          :index="getTableIndex"
        ></el-table-column>
        <el-table-column
          v-for="(v, i) in tableColumns"
          :key="`tc_${v.key}_${i}`"
          :prop="v.key"
          :label="v.label"
          :width="hasFields(v,'width') ? v.width : 'auto'"
          :class-name="`column-${v.type}`"
        >
          <template slot-scope="{ row }">
            <template v-if="v.type === 'date'">
              <div class="date">
                <span>{{ row[v.key].create_at }}</span>
                <span>{{ row[v.key].update_at }}</span>
              </div>
            </template>
            <template v-else-if="v.type === 'badge'">
              <el-tag size="medium" :class="`tag-${row[v.key].key}`">
                {{ row[v.key].text }}
              </el-tag>
            </template>
            <template v-else-if="v.type === 'link'">
              <n-link
                :to="getRouterLink(row.id, viewRoute)"
                :class="{disabled: isSelectedItem(row.id)}"
              >{{ row[v.key] }}</n-link>
            </template>
            <template v-else>{{ row[v.key] }}</template>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          width="186"
          class-name="column-actions"
        >
          <template slot-scope="{ row }">
            <i-btn
              circle small
              prepend-icon="eye"
              :loading="isSelectedItem(row.id)"
              @click.native.prevent="$router.push(getRouterLink(row.id, viewRoute))"
            />
            <i-btn
              circle small
              prepend-icon="pencil"
              :loading="isSelectedItem(row.id)"
              @click.native.prevent="$router.push(getRouterLink(row.id, updateRoute))"
            />
            <el-popconfirm
              :confirm-button-text="$t('yes')"
              :cancel-button-text="$t('no')"
              hide-icon
              :title="$t('delete_confirm_text')"
              @confirm="deleteContentById(row.id)"
            >
              <i-btn
                circle small
                append-icon="trash"
                slot="reference"
                :loading="isSelectedItem(row.id)"
              />
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :current-page.sync="pagination"
          background
          layout="prev, pager, next"
          :page-size.sync="paginationParams.limit"
          :total="paginationParams.total_count"
        />
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {
  Table,
  TableColumn,
  Tag,
  Popconfirm,
  Popover,
  Pagination
} from 'element-ui'

export default {
  name: 'page-table',
  data(){
    return {
      loading: false,
      selectedColumnId: null,
      filterPanel: false,
      formFilter: {...this.filterItems},
      pagination: 1
    }
  },
  props: {
    updateRoute: Object,
    viewRoute: Object,
    pageActions: Array,
    tableColumns: {
      type: Array,
      required: true
    },
    tableList: {
      type: Array,
      required: true
    },
    filter: {
      type: Boolean,
      default: false
    },
    filterWidth: {
      type: Number,
      default: 500
    },
    filterItems: Object,
    filterColumns: Object,
    paginationParams: Object,
    getContents: Function,
    deleteContent: Function,
    setFields: Function
  },
  components: {
    pageActions: () => import('@/components/page-actions'),
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Popconfirm.name]: Popconfirm,
    [Popover.name]: Popover,
    [Pagination.name]: Pagination,
    [Tag.name]: Tag
  },
  watch: {
    pagination(v){
      this.$router.push({
        name: this.$route.name,
        query: {
          page: v
        }
      }).then(res => {
        if (!this.filterPanel) {
          this.updateContent(true)
        }
      }).catch(err => {})
    },
    $route(v){
      this.updatePagination()
    }
  },
  methods: {
    isSelectedItem(id){
      return this.selectedColumnId === id
    },
    deleteContentById(id) {
      this.selectedColumnId = id
      this.deleteContent(id)
        .then(() => {
          this.updateContent(true)
        })
        .catch(() => {
          this.selectedColumnId = null
        })
    },
    updateContent(reload = false){
      this.loading = true
      this.getContents({reload, page: this.pagination})
        .then(() => {
          this.selectedColumnId = null
          this.loading = false
        })
    },
    changeFilter(clear = false){
      let sort = {}, noEmpty = false
      for (let i in this.formFilter) {
        if (!this.isEmpty(this.formFilter[i])) {
          noEmpty = true
        }
        if (clear) {
          this.$set(this.formFilter, i, null)
        }
      }
      if (noEmpty) {
        this.setFields({
          filters: {...this.formFilter}
        })
        this.pagination = 1
        this.filterPanel = false
        this.updateContent(true)
      }
    },
    getRouterLink(id, route, query = {}){
      return {...route, ...{params: {id}, query}}
    },
    getTableIndex(index){
      return this.paginationParams.offset + index + 1
    },
    updatePagination(){
      if (this.hasFields(this.$route,'query','page')) {
        let page = parseInt(this.$route.query.page)
        if (page > 0 && page !== this.pagination) {
          this.pagination = page
        }
      } else {
        console.log(this.pagination)
        this.pagination = 1
      }
    }
  },
  mounted() {
    this.updatePagination()
    this.updateContent()
  }
}
</script>
