import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    products: [],
    tables: [],
    closedTables: [],
    table: {
      number: '',
      clients: '',
      products: []
    }
  },
  mutations: {
    addProd(state, payload){
      state.products.push(payload)
    },
    addClosedTable(state, payload){
      state.tables.splice(payload.id)
      state.closedTables.push(payload)
    },
    getTable(state, payload){
      state.table = payload
    },
    addTable(state, payload){
      console.log({...payload})
      state.tables.push(payload)
    },
    insertOrder(state, payload){
      state.table.products.push(payload)
      console.log(this.tables)
      for(let i = 0; i < this.tables.length; i++){
        if(this.tables[i].number == payload.number){
          this.tables[i] = payload
          return
        }
      }
    }

  },
  actions: {

  }
})
