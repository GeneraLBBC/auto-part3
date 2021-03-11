<template>
  <el-container class="idev theme-light" id="idev">
    <el-aside class="idev-nav">
      <el-row>
        <el-col :span="5">
          <ul class="nav-left">
            <li class="logo">
              <img src="/logo.svg">
            </li>
            <template v-for="(v, i) in menu">
              <li :key="`pm_${i}`">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="$t(`${i}.title`)"
                  placement="right"
                  :disabled="v.actives.includes(menuActive)"
                >
                  <n-link
                    :to="v.link"
                    :class="{link: true, active: v.actives.includes(menuActive)}"
                  >
                    <icon :icon="v.icon" :type="v.actives.includes(menuActive) ? 'fas' : 'fal'"/>
                  </n-link>
                </el-tooltip>
              </li>
            </template>
            <li class="logout">
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('logout')"
                placement="right"
              >
                <a class="link" @click="logOut">
                  <icon icon="sign-out"/>
                </a>
              </el-tooltip>
            </li>
          </ul>
        </el-col>
        <el-col :span="19">
          <div class="nav-right">
            <template v-for="(p, x) in menu">
              <div
                v-if="p.actives.includes(menuActive)"
                :key="`nav_right_tab_-${x}`"
                class="nav-right-tab"
              >
                <h3>{{ $t(`${x}.title`) }}</h3>
                <div
                  v-for="(v,i) in p.submenu"
                  :key="`nav_right_list_${i}`"
                  class="nav-right-list"
                >
                  <h4>{{ $t(i) }}</h4>
                  <ul>
                    <li
                      v-for="(m,n) in v"
                      :key="`nav_item_${n}`"
                    >
                      <nuxt-link
                        :to="m.link"
                        active-class="active"
                        :exact="hasFields(m,'exact') ? m.exact : true"
                      >
                        <icon :icon="m.icon"/>
                        {{ $t(m.title) }}
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </div>
        </el-col>
      </el-row>
    </el-aside>
    <el-container class="idev-content">
      <nuxt></nuxt>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  auth: true,
  data(){
    return {
      menuActive: 'dashboard'
    }
  },
  watch: {
    messages(val){
      this.getFlashes(val)
    },
    $route(val){
      this.hasRules(val)
      this.changeActiveMenu()
    }
  },
  computed: {
    ...mapState(['menu', 'messages'])
  },
  methods: {
    changeActiveMenu(){
      try {
        if (this.hasFields(this.$route,'name') && !!this.$route.name) {
          let key = this.$route.name.split('_')
          if (key.length > 2) {
            this.menuActive = `${key[0]}_${key[1]}`
          } else {
            this.menuActive = key[0]
          }
        }
      } catch (e) {
        console.log("layoutDefault: changeActiveMenu",e)
      }
    },
    hasRules(route){
      /*if (
          ![this.homeUrl, "auth_login", "auth_logout", "error"].includes(route.name) &&
          this.user.type !== "administrator" &&
          !this.user.rules.includes(route.name)
      ) {
        this.$root.error({statusCode: 403})
      }*/
    },
    logOut(){
      this.alert('Выход', 'Вы действительно хотите выйти?')
        .then(() => {
          this.$auth.logout()
            .then(() => {
              window.location.href = window.location.origin
              // window.location.reload(true)
              // this.$router.push({name: 'auth_login'})
            })
        })
        .catch(() => {
          // this.getFlash('A che takoe?', 'warning')
        })
    }
  },
  mounted(){
    this.hasRules(this.$route)
    this.changeActiveMenu()
  }
}
</script>

<style lang="stylus" src="@/assets/app.styl"></style>
