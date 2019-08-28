import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    products: [],
    tables: [],
    closedTables: [],
    table: {}
  },
  mutations: {
    addProd(state, payload){
      state.products.push(payload)
    },
    addClosedTable(state, payload){
      state.closedTables.push(payload)
    },
    getTable(state, payload){
      state.table = payload
    },
    addTable(state, payload){
      state.tables.push(payload)
    },

  },
  actions: {

  }
})
