export const state = () => ({
  homeLink: {name: "dashboard"},
  loginLink: {name: "auth_login"},
  theme: 'light',
  defaultLanguage: "ru",
  languageList: ["ru"],
  messages: [],
  profile: {},
  menu: {}
})

export const mutations = {
  setMessages(state, messages) {
    state.messages = messages
  },
  setStartContent(state, data) {
    if (typeof data.menu !== 'undefined') {
      state.menu = data.menu
    }
    if (typeof data.user !== 'undefined') {
      state.profile = data.user
    }
    if (typeof data.languages !== 'undefined') {
      state.languageList = []
      for (let i in data.languages) {
        state.languageList.push(data.languages[i])
      }
    }
  }
}

export const actions = {
  async getStartContent({commit}) {
    await this.$axios.$post('/dashboard/start')
      .then((response) => {
        commit('setStartContent',response.data)
      });
  },
  searchContentInList({state, commit}, option) {
    option = {name: '', ...option}
    return new Promise((resolve, reject) => {
      this.$axios.$post('/dashboard/search',option)
        .then(response => {
          resolve(response)
        })
    })
  }
}
