import { userApi } from '@/helpers/ApiUrlList'
import { defaultState, defaultMutations, defaultActions, defaultGetters } from '@/helpers/VuexHelper'

export const state = () => defaultState()

export const mutations = defaultMutations()

export const actions = defaultActions(userApi)

export const getters = defaultGetters()
