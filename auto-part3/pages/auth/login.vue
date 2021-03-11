<template>
  <el-row>
    <el-col :span="16" class="auth-content">

    </el-col>
    <el-col :span="8" class="auth-login">
      <div class="auth-card">
        <h2>{{ $t('auth.login') }}</h2>
        <el-form
          :model="authForm"
          ref="authForm"
          :disabled="formDisabled"
          :rules="authRules"
          label-position="top"
        >
          <el-form-item prop="phone">
            <el-input
              v-model.number="authForm.phone"
              :placeholder="formOptions.phone_plh"
              clearable
            >
              <template slot="prepend">+998</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="authForm.password"
              type="password"
              autocomplete="off"
              clearable show-password
              :placeholder="formOptions.password_plh"
              @keypress.enter="formSubmit"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="actions">
          <i-btn
            type="primary"
            @click="formSubmit"
            :text="$t('auth.sign_in')"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "login",
    data(){
      return {
        formDisabled: false,
        authForm: {
          phone: '',
          password: ''
        }
      }
    },
    computed: {
      ...mapState(['homeLink']),
      authRules(){
        return {
          phone: [this.formRules.required, this.formRules.phone],
          password: [this.formRules.required, this.formRules.password]
        }
      }
    },
    methods: {
      formSubmit(){
        this.$refs.authForm.validate((valid) => {
          if (valid) {
            this.formDisabled = true
            this.$axios.$post('/auth/sign-in',this.authForm)
              .then((res) => {
                if (res.success) {
                  this.$auth.setUserToken(res.data.token)
                    .then(() => {
                      this.$router.push(this.homeLink)
                      // window.location.reload()
                    })
                    .catch((err) => console.log('AUTH ERR:  ',err))
                } else {
                  this.formDisabled = false
                }
              })
              .catch((err) => {
                console.log("loginError: ",err)
                this.formDisabled = false
              })
          } else {
            return false;
          }
        })
      }
    }
  }
</script>
