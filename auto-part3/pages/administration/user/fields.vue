<template>
  <page-form v-bind="formParams"></page-form>
</template>

<script>
  const MODULE_KEY = 'user'
  import { mapState, mapActions } from 'vuex'
  export default {
    name: "fields",
    props: {
      updateId: {
        type: Number,
        default: null
      },
      isContent: {
        type: Object,
        default: () => {}
      }
    },
    components: {
      pageForm: () => import('@/components/page-form')
    },
    computed: {
      ...mapState(MODULE_KEY, ['options']),
      formParams(){
        return {
          id: this.updateId,
          backLink: {name: `${MODULE_KEY}_list`},
          formFields: {
            first_name: null,
            last_name: null,
            middle_name: null,
            phone: null,
            email: null,
            password: null,
            comment: null,
            status: this.$store.getters[`${MODULE_KEY}/getDefaultValue`]('status'),
            type: this.$store.getters[`${MODULE_KEY}/getDefaultValue`]('type'),
            ...this.isContent
          },
          formFieldRules: {
            last_name: [this.formRules.required, this.formRules.string],
            first_name: [this.formRules.required, this.formRules.string],
            middle_name: [this.formRules.string],
            phone: [this.formRules.required, this.formRules.phone],
            email: [this.formRules.email],
            status: [this.formRules.required],
            type: [this.formRules.required],
          },
          formColumns: {
            fio: [
              {key: "last_name", type: "text", col: 8},
              {key: "first_name", type: "text", col: 8},
              {key: "middle_name", type: "text", col: 8}
            ],
            phone: [
              {
                key: "phone",
                type: "text",
                prepend: '+998',
                placeholder: this.formOptions.phone_plh
              }
            ],
            email: [
              {
                key: "email",
                type: "text",
                placeholder: this.formOptions.email_plh
              }
            ],
            password: [
              {
                key: "password",
                type: "text",
                placeholder: this.formOptions.password_plh
              }
            ],
            type: [
              {
                key: "type",
                type: "select",
                list: this.options.type
              }
            ],
            status: [
              {
                key: "status",
                type: "select",
                list: this.options.status
              }
            ],
            comment: [
              {
                key: "comment",
                type: "textarea"
              }
            ]
          },
          ...mapActions(MODULE_KEY, ['setContent'])
        }
      }
    }
  }
</script>
