<template>
  <el-row>
    <page-actions
      :disabled="formDisabled"
      :actions="[...actions, ...customActions]"
    />
    <el-col :span="24" class="idev-page-form">
      <el-form
        :model="form"
        ref="form"
        :disabled="formDisabled"
        :rules="rules"
      >
        <el-row :gutter="24">
          <el-col
            v-for="(section, index) in formColumns"
            :key="`section-${index}`"
            :span="24"
          >
            <el-row :gutter="24">
              <el-col :span="6">
                <p class="form-label">{{ $t(index) }}</p>
              </el-col>
              <el-col :span="18">
                <el-row :gutter="24">
                  <el-col
                    v-for="v in section"
                    :key="`section_field_${v.key}`"
                    :xl="getField(v,'col', 12)"
                    :lg="getField(v,'col', 24)"
                  >
                    <template v-if="v.type === 'text'">
                      <el-form-item :prop="v.key">
                        <el-input
                          v-model="form[v.key]"
                          :placeholder="getField(v, 'placeholder', $t(v.key))"
                          clearable
                          autocomplete="off"
                        >
                          <template v-if="v.prepend"  slot="prepend">{{ v.prepend }}</template>
                          <template v-if="v.append"  slot="append">{{ v.append }}</template>
                          <icon v-if="v.suffix" slot="suffix" :icon="v.suffix"/>
                          <icon v-if="v.prefix" slot="prefix" :icon="v.prefix"/>
                        </el-input>
                      </el-form-item>
                    </template>
                    <template v-if="v.type === 'textarea'">
                      <el-form-item :prop="v.key">
                        <el-input
                          v-model="form[v.key]"
                          type="textarea"
                          :rows="getField(v, 'rows', 4)"
                          :placeholder="getField(v, 'placeholder', $t(v.key))"
                          clearable
                          autocomplete="off"
                        ></el-input>
                      </el-form-item>
                    </template>
                    <template v-if="v.type === 'select'">
                      <el-form-item :prop="v.key">
                        <el-select
                          v-model="form[v.key]"
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
                      <el-form-item :prop="v.key">
                        <el-date-picker
                          v-model="form[v.key]"
                          type="date"
                          :placeholder="getField(v, 'placeholder', $t('choose'))"
                          :format="formOptions.date_format_view"
                          :value-format="formOptions.date_format"
                        />
                      </el-form-item>
                    </template>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <slot
              name="form-end"
              v-bind="{formFields, formDisabled}"
            ></slot>
          </el-col>
          <el-col :span="18" :offset="6" class="form-actions">
            <i-btn
              type="primary"
              :text="$t('save')"
              @click="formSubmit"
              prepend-icon="check"
            />
            <i-btn-link
              :to="backLink"
              :text="$t('cancel')"
              prepend-icon="close"
            />
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "page-form",
    data(){
      return {
        formDisabled: false,
        form: {...this.formFields},
        rules: {...this.formFieldRules}
      }
    },
    props: {
      id: {
        type: Number,
        default: null
      },
      backLink: {
        type: Object,
        default: false
      },
      customActions: {
        type: Array,
        default:() => []
      },
      formFields: {
        type: Object,
        default: () => {}
      },
      formFieldRules: {
        type: Object,
        default: () => {}
      },
      formColumns: {
        type: Object,
        default: () => {}
      },
      setContent: Function
    },
    computed: {
      ...mapState(['homeLink']),
      actions(){
        return [
          { text: this.$t('prev'), to: this.backLink ? this.backLink : this.homeLink, prependIcon: 'angle-left' }
        ]
      }
    },
    components: {
      pageActions: () => import('@/components/page-actions')
    },
    methods: {
      formSubmit(){
        try {
          this.$refs.form.validate((valid) => {
            if (valid) {
              this.formDisabled = true
              this.setContent({id: this.id, form: this.form})
                .then(() => {
                  this.$router.push(this.backLink)
                })
                .catch(() => {
                  this.formDisabled = false
                });
            } else {
              return false;
            }
          })
        } catch (e) {
          this.formDisabled = false
          this.getFlash(e,'error')
        }
      }
    }
  }
</script>
