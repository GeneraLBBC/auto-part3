import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export function createRouter(){
  const home_url = "dashboard";
  const router = new Router({
    mode: 'history',
    routes: [
      {
        path: '',
        component:() => import('@/pages/layout').then(m => m.default || m),
        children: [
          {path: '', redirect: {name: home_url}},
          {
            path: 'dashboard',
            component:() => import('@/pages/dashboard/layout').then(m => m.default || m),
            children: [
              { path: '', name: 'dashboard', component:() => import('@/pages/dashboard/index').then(m => m.default || m) },
              { path: 'test', name: 'dashboard_test', component:() => import('@/pages/dashboard/test').then(m => m.default || m) },
            ]
          },
          {
            path: 'report',
            component:() => import('@/pages/test/layout').then(m => m.default || m),
            children: [
              { path: '', redirect: {name: 'income_list'} },

              { path: 'income/list', name: 'income_list', component:() => import('@/pages/test/index').then(m => m.default || m) },
              { path: 'income/create', name: 'income_create', component:() => import('@/pages/test/index').then(m => m.default || m) },

              { path: 'outcome/list', name: 'outcome_list', component:() => import('@/pages/test/index').then(m => m.default || m) },
              { path: 'outcome/create', name: 'outcome_create', component:() => import('@/pages/test/index').then(m => m.default || m) },

              { path: 'exchange/list', name: 'exchange_list', component:() => import('@/pages/test/index').then(m => m.default || m) },
              { path: 'exchange/create', name: 'exchange_create', component:() => import('@/pages/test/index').then(m => m.default || m) },

              { path: 'moving/list', name: 'moving_list', component:() => import('@/pages/test/index').then(m => m.default || m) },
              { path: 'moving/create', name: 'moving_create', component:() => import('@/pages/test/index').then(m => m.default || m) },
            ]
          },
          {
            path: 'product',
            component:() => import('@/pages/test/layout').then(m => m.default || m),
            children: [
              { path: '', redirect: {name: 'product_list'} },

              { path: 'product/list', name: 'product_list', component:() => import('@/pages/test/index').then(m => m.default || m) },
              { path: 'product/create', name: 'product_create', component:() => import('@/pages/test/index').then(m => m.default || m) },

              { path: 'category/list', name: 'category_list', component:() => import('@/pages/test/index').then(m => m.default || m) },
              { path: 'category/create', name: 'category_create', component:() => import('@/pages/test/index').then(m => m.default || m) },
            ]
          },
          {
            path: 'organization',
            component:() => import('@/pages/test/layout').then(m => m.default || m),
            children: [
              { path: '', redirect: {name: 'org_list'} },

              { path: 'org/list', name: 'org_list', component:() => import('@/pages/test/index').then(m => m.default || m) },
              { path: 'org/create', name: 'org_create', component:() => import('@/pages/test/index').then(m => m.default || m) },

              { path: 'store/list', name: 'store_list', component:() => import('@/pages/test/index').then(m => m.default || m) },
              { path: 'store/create', name: 'store_create', component:() => import('@/pages/test/index').then(m => m.default || m) },

              { path: 'warehouse/list', name: 'warehouse_list', component:() => import('@/pages/test/index').then(m => m.default || m) },
              { path: 'warehouse/create', name: 'warehouse_create', component:() => import('@/pages/test/index').then(m => m.default || m) },
            ]
          },
          {
            path: 'administration',
            component:() => import('@/pages/administration/layout').then(m => m.default || m),
            children: [
              { path: '', redirect: {name: 'user_list'} },

              { path: 'user/list', name: 'user_list', component:() => import('@/pages/administration/user/index').then(m => m.default || m) },
              { path: 'user/create', name: 'user_create', component:() => import('@/pages/administration/user/create').then(m => m.default || m) },
              { path: 'user/update/:id', name: 'user_update', component:() => import('@/pages/administration/user/update').then(m => m.default || m) },
              { path: 'user/view/:id', name: 'user_view', component:() => import('@/pages/administration/user/info').then(m => m.default || m) },
              { path: 'user/deleted', name: 'user_deleted', component:() => import('@/pages/administration/user/index').then(m => m.default || m) },
            ]
          },
          {
            path: 'media',
            component:() => import('@/pages/test/layout').then(m => m.default || m),
            children: [
              { path: '', redirect: {name: 'photo_list'} },

              { path: 'photo/list', name: 'photo_list', component:() => import('@/pages/test/index').then(m => m.default || m) },
              { path: 'photo/create', name: 'photo_create', component:() => import('@/pages/test/index').then(m => m.default || m) },
            ]
          },
          {
            path: 'other',
            component:() => import('@/pages/test/layout').then(m => m.default || m),
            children: [
              { path: '', redirect: {name: 'regions_list'} },

              { path: 'regions/list', name: 'regions_list', component:() => import('@/pages/test/index').then(m => m.default || m) },
              { path: 'regions/create', name: 'regions_create', component:() => import('@/pages/test/index').then(m => m.default || m) },
            ]
          },
        ]
      },
      {
        path: '/auth',
        component:() => import('@/pages/auth/layout').then(m => m.default || m),
        children: [
          { path: '', redirect: {name: "auth_login"} },
          { path: 'login', name: 'auth_login', component:() => import('@/pages/auth/login').then(m => m.default || m) },
          { path: 'logout', name: 'auth_logout', component:() => import('@/pages/auth/logout').then(m => m.default || m) },
        ]
      },
    ],
    scrollBehavior (to, from, savedPosition) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (savedPosition) {
            resolve(savedPosition)
          } else {
            resolve({ x: 0, y: 0 })
          }
        }, 500)
      })
    }
  })

  /*router.beforeEach((to, from, next) => {
    next()
  })*/

  return router
}
