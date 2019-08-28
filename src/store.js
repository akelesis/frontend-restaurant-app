import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    products: [],
    closedTables: []
  },
  mutations: {
    addProd(state, payload){
      state.products.push(payload)
    },
    addTable(state, payload){
      state.closedTables.push(payload)
    }
  },
  actions: {

  }
})
