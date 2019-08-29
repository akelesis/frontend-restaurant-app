<template>
  <div class="table-manager">
    <div class="left-panel">
      <div class="product-box">
        <b-table small hover striped :items="products" :fields="fields">
          <template slot="action" slot-scope="{ item }">
            <b-button size="sm" variant="warning" @click="addProd(item)">
              <i class="fas fa-cart-plus"></i>
            </b-button>
          </template>
        </b-table>
      </div>
      <b-input-group size="md" prepend="Produto">
        <b-form-input v-model="product.name"></b-form-input>
      </b-input-group>
      <b-input-group size="md" prepend="quantidade">
        <b-form-input type="number" v-model="quantity" min="0" max="999"></b-form-input>
      </b-input-group>
      <b-button class="mt-3" variant="primary" block @click="insertOrder(product)">Inserir pedido</b-button>
      <div class="return-arrow">
        <router-link to="/restaurant">
          <i class="fas fa-arrow-left"></i> Retornar
        </router-link>
      </div>
    </div>
    <div class="right-panel">
      <div class="table-box">
        <b-table small hover striped :items="table.products" :fields="tableFields">
          <template slot="action" slot-scope="{ item }">
            <b-button size="sm" variant="warning" @click="addProd(item)">
              <i class="fas fa-search"></i>
            </b-button>
          </template>
        </b-table>
      </div>
      <div class="bill">
        Subtotal: R$ {{bill.toFixed(2).replace('.', ',')}}
        <b-input-group size="md" prepend="couvert">
          <b-form-input type="number" v-model="couvert" min="0" max="999" @change="getBill"></b-form-input>
        </b-input-group>
        <p>Dez porcento: R${{tip}}</p>
        <p>Total: R${{total}}</p>
      </div>
      <b-button class="mt-3" variant="danger" block @click="closeTable">Fechar Mesa</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      quantity: "",
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "preco", label: "Preço", sortable: false },
        { key: "action", label: "Seleção" }
      ],
      tableFields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "quantity", label: "Quantidade", sortable: false }
      ],
      bill: 0.00,
      couvert: 0.00,
      total: 0.00,
      tip: 0.00
    };
  },
  methods: {
    insertOrder() {
      this.product.quantity = this.quantity;
      let order = { ...this.product };
      this.$store.commit("insertOrder", order);
    },
    addProd(item) {
      this.product = item;
    },
    getBill() {
      this.bill = 0
      for (let i = 0; i < this.table.products.length; i++) {
        this.bill +=
          parseFloat(this.table.products[i].preco) *
          parseFloat(this.table.products[i].quantity);
      }
        this.tip = (this.bill * 0.1)
        this.total = parseFloat(this.bill) + parseFloat(this.couvert * this.table.clients) + parseFloat(this.tip)
        this.total = this.total.toFixed(2).replace('.', ',')
        this.tip = this.tip.toFixed(2).replace('.', ',')
    },
    
    closeTable(){
        const closedTable = {}
        const today = new Date()
        closedTable.bill = this.bill
        closedTable.date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDay()
        closedTable.id = this.table.id
        this.$store.commit('addClosedTable', closedTable)
        console.log({...this.closedTables})

    }
  },
  computed: {
    products() {
      return this.$store.state.products
    },
    table() {
      return this.$store.state.table
    },
    closedTables(){
      return this.$store.state.closedTables
    }
  },
  mounted() {
    this.getBill()
  }
};
</script>

<style>
.table-manager {
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
}

.left-panel {
  width: 40vw;
  margin-left: 20px;
}

.right-panel {
  width: 40vw;
  margin-left: 20px;
}

.product-box {
  height: 500px;
  background-color: #ccc;
}

.table-box {
  height: 500px;
  background-color: #ccc;
}

.return-arrow {
  margin-left: 10px;
  padding-top: 50px;
  font-size: 20px;
}

.bill {
  font-size: 25px;
  text-align: right;
  color: #00aa00;
}
</style>