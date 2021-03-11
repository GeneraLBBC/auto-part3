/*const crypto = require('crypto')
const sha1 = crypto.createHash('sha1')*/
import appConfig from '../config/main'

export default function ({ $axios, app, store, redirect, route, error }) {

  $axios.onRequest(config => {
    /*let rKey = '';
    if (typeof route.name !== 'undefined' && route.name !== null) {
      rKey = route.name
    }
    config.headers.common[appConfig.api_header_key] = rKey
    config.headers.common[appConfig.api_header_language] = store.state.defaultLanguage*/
  })

  $axios.onError(err => {
    const code = parseInt(err.response && err.response.status)
    if (code){
      if (code === 401) {
        app.$auth.logout()
          .then(() => {
            // window.location.reload(true)
            // redirect(store.state.auth.loginUrl)
          })
          .catch((err) => {
            throw err
          })
      } else {
        error({statusCode: code})
      }
    } else {
      error({statusCode: code})
    }
  })

  $axios.onResponse(response => {
    if (typeof response.data.messages !== 'undefined') {
      store.commit('setMessages',response.data.messages)
    }
  })
  // onError(err)
  // onRequestError(err)
  // onResponseError(err)

}
