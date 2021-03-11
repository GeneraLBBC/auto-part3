
export const defaultState = (customState = {}) => {
  const state = {
    list: [],
    labels: [],
    options: {},
    pagination: {},
    filters: {}
  }
  return {...state, ...customState}
}

export const defaultMutations = (customMethods = {}) => {
  const methods = {
    setFields(state, data){
      for (let i in data) {
        if (typeof state[i] !== 'undefined') {
          state[i] = data[i]
        }
      }
    }
  }
  return {...methods, ...customMethods}
}

export const defaultActions = (api, customMethods = {}) => {
  let methods = {
    async getOptions({state, commit}) {
      if (Object.keys(state.options).length === 0) {
        await this.$axios.$post(api.options)
          .then((response) => {
            commit('setFields',response.data)
          });
      }
    },
    getContents({state, commit}, option) {
      option = {reload: false, page: 1, ...option}
      console.log(state.pagination)
      if (state.pagination.offset > 0) {
        option.reload = true
      }
      return new Promise((resolve, reject) => {
        if (state.list.length === 0 || option.reload) {
          this.$axios.$post(api.list,{
            filters: state.filters,
            page: option.page
          })
            .then(response => {
              commit('setFields',response.data)
              resolve()
            })
        } else {
          resolve()
        }
      })
    },
    setContent({state, commit}, option) {
      option = {id: null, form: {}, ...option}
      return new Promise((resolve, reject) => {
        this.$axios.$post(api.set,option)
          .then((res) => {
            if (res.success) {
              commit('setFields',{
                list: [],
                pagination: {},
                filters: {}
              })
              resolve()
            } else {
              reject()
            }
          });
      })
    },
    getContent({state, commit}, option) {
      option = {...option}
      return new Promise((resolve, reject) => {
        this.$axios.$post(api.get,option)
          .then(res => resolve(res))
          .catch(err => reject())
      })
    },
    viewContent({state, commit}, option) {
      option = {...option}
      return new Promise((resolve, reject) => {
        this.$axios.$post(api.view,option)
          .then(res => resolve(res))
          .catch(err => reject())
      })
    },
    deleteContent({state, commit}, arr) {
      return new Promise((resolve, reject) => {
        this.$axios.$post(api.delete,{id: arr})
          .then(response => {
            resolve()
          })
          .catch(response => {
            reject()
          })
      })
    }
  }
  return {...methods, ...customMethods}
}

export const defaultGetters = (customMethods = {}) => {
  const methods = {
    getDefaultValue: state => type => {
      if (typeof state.options.default !== 'undefined' && typeof state.options.default[type] !== 'undefined') {
        return state.options.default[type]
      }
      return null
    }
  }
  return {...methods, ...customMethods}
}
