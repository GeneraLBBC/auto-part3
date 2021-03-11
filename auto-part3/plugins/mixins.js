import Vue from 'vue'

export default async ({ store, route }) => {
  await Vue.mixin({
    computed: {
      formRules(){
        const trigger = 'blur' // change, blur
        return {
          required: {
            required: true,
            message: this.$t('validate.required'),
            trigger
          },
          phone: {
            validator: (rule, value, callback) => {
              if (!this.isEmpty(value)) {
                value = value.toString().replace(/[^\d]/g,'')
                if (this.isEmpty(value)) {
                  callback(this.$t('validate.invalid_phone'))
                } else {
                  this.isRegExp(value, "^[0-9]{9}$", 'validate.invalid_phone', callback)
                }
              } else {
                callback()
              }
            },
            trigger
          },
          string: {
            validator: (rule, value, callback) => this.isRegExp(value, "^[A-Za-zа-яА-ЯёЁ,.`'\" _-]{1,100}$", 'validate.invalid_input', callback),
            trigger
          },
          string_integer: {
            validator: (rule, value, callback) => this.isRegExp(value, "^[A-Za-zа-яА-ЯёЁ0-9,.`'\" _-]{1,100}$", 'validate.invalid_input', callback),
            trigger
          },
          password: {
            min: 6,
            max: 32,
            message: this.$t('validate.invalid_password'),
            trigger
          },
          email: {
            validator: (rule, value, callback) => this.isRegExp(value, "^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$", 'validate.invalid_email', callback),
            trigger
          },

          login: value => this.isRegExp(value, "^[A-Za-z0-9-_]{4,30}$", 'validate.invalid_input'),
          url: value => this.isRegExp(value, "^[a-z0-9-]{3,80}$", 'validate.invalid_input'),
          code: value => this.isRegExp(value, "^[0-9-]{1,15}$", 'validate.invalid_input'),
          opf_prefix: value => this.isRegExp(value, "^[A-ZА-ЯЁ]{1,6}$", 'validate.invalid_input'),
          trade_type: value => this.isRegExp(value, "^[A-ZА-ЯЁ-]{1,10}$", 'validate.invalid_input'),
          name2: value => this.isRegExp(value, "^[A-Za-zа-яА-ЯёЁ,.`'\" _-]{1,100}$", 'validate.invalid_input'),
          address: value => this.isRegExp(value, "^[A-Za-zа-яА-ЯёЁ0-9`/,.:;\"()@' _-]{3,400}$", 'validate.invalid_input'),
          website: value => this.isRegExp(value, "^(http(s)?:\\/\\/)?([a-z0-9-]{1,20}\\.)?[a-z0-9-]{2,30}\\.[a-z0-9]{2,8}(\\/)?$", 'validate.invalid_input'),
          passport: value => this.isRegExp(value, "^[A-Z]{1,3}[0-9]{5,7}$", 'validate.invalid_passport'),
          card_number: value => !!value ? this.isRegExp(value.toString().replace(/[^\d]/g,''), "^[0-9]{16}$", 'validate.invalid_card_number') : true,
          inn: value => this.isRegExp(value, "^[0-9]{5,10}$", 'validate.invalid_inn'),
          okonx: value => this.isRegExp(value, "^[0-9]{4,7}$", 'validate.invalid_okonx'),
          amount: value => this.isRegExp(value, "^[0-9, ]{1,20}$", 'validate.invalid_input'),
          integer: value => this.isRegExp(value, "^[0-9]{1,10}$", 'validate.invalid_input')
        }
      },
      formOptions(){
        return {
          phone_mask: '+998 ## ###-##-##',
          phone_plh: '90 123-45-67',
          email_plh: 'example@mail.com',
          website_plh: 'https://example.com',
          opf_plh: 'ООО',
          password_plh: '••••••••',
          passport_plh: 'AA1234567',
          account_number_mask: '##### ##### ##### ##### ##### ##### ',
          integer_mask_10: '##########',
          integer_mask_20: '####################',
          date_format: 'yyyy-MM-dd',
          date_format_view: 'dd-MMM, yyyy',
          currency: 'XXXXXX',
          trade_type: 'XXXXXX',
          money: {
            decimal: ',',
            thousands: ' ',
            precision: 0,
            masked: false
          },
          amount: {
            decimal: ',',
            thousands: ' ',
            precision: 2,
            masked: false
          }
        }
      }
    },
    methods: {
      getFlash(title, type = 'info', timeout = 500000, position = 'top-right'){
        let options = {
          title,
          type,
          duration: timeout,
          iconClass: false,
          customClass: `theme-${store.state.theme} idev-toast ${type}`,
          position: position,
          offset: 50
        };
        return this.$notify(options);
      },
      getFlashes(res,timeout = 5000, position = 'top-right'){
        if (typeof res.messages !== 'undefined') {
          res = res.messages
        }
        for (let i in res) {
          let v = res[i]
          setTimeout(() => {
            this.getFlash(v.text,v.type,timeout,position)
          }, 5)
        }
      },
      fa(icon, type = 'fal', full = true){
        return full ? `${type} fa-${icon}` : `fa-${icon}`
      },
      hasFields(field, ...items){
        if (typeof field === 'undefined' || field === null) {
          return false;
        }
        let args = items;
        for (let i in args) {
          let item = args[i]
          if (typeof field[item] !== 'undefined') {
            field = field[item]
          }else{
            return false;
          }
        }
        return true;
      },
      getField(content, item, default_value = null){
        return this.hasFields(content, item) ? content[item] : default_value
      },
      isEmpty(variable){
        if (
          typeof variable === 'undefined' ||
          variable === '' ||
          variable === null ||
          !variable
        ) {
          return true
        }
        return false
      },
      isRegExp(value, pattern, error_text, callback){
        let reg = new RegExp(pattern);
        return !!value && !reg.test(value) ? callback(this.$t(error_text)) : callback()
      },
      generateRandomString(length = 32) {
        let res = '',
            list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&()',
            listLength = list.length
        for ( let i = 0; i < length; i++ ) {
          res += list.charAt(Math.floor(Math.random() * listLength));
        }
        return res;
      },
      clearForm(form){
        for (let i in form) {
          if (['phone','fax'].includes(i)) {
            form[i] = !!form[i] ? form[i].toString().replace(/[^\d]/g,''): null;
          } else {
            form[i] = form[i] === '' ? null : form[i];
          }
        }
        return form
      },
      alert(title, text){
        return this.$confirm(text, title, {
          confirmButtonText: this.$t('confirm'),
          cancelButtonText: this.$t('cancel'),
          // type: 'warning',
          center: true
        })
      }
    }
  })
}
