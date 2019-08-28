<template>
  <div class="table-manager">
    <div class="left-panel">
      <div class="product-box">
        <b-table small hover striped :items="products" :fields="fields">
          <template slot="details" slot-scope="{ item }">
            <b-button size="sm" variant="warning" @click="addProd(item)">
              <i class="fas fa-search"></i>
            </b-button>
          </template>
        </b-table>
      </div>
      <b-input-group size="md" prepend="Produto">
        <b-form-input></b-form-input>
      </b-input-group>
      <b-input-group size="md" prepend="quantidade">
        <b-form-input type="number" aria-label="Text input with checkbox" min="0" max="999"></b-form-input>
      </b-input-group>
      <b-button class="mt-3" variant="primary" block @click="manageTable(table)">Inserir pedido</b-button>
      <div class="return-arrow">
        <router-link to="/restaurant">
          <i class="fas fa-arrow-left"></i> Retornar
        </router-link>
      </div>
    </div>
    <div class="right-panel">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {},
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "name", label: "Nome", sortable: true },
        { key: "preco", label: "Preço", sortable: false }
      ],

    };
  },

  computed: {
    products() {
      return this.$store.state.products
    },
    table(){
        return this.$store.state.table
    }
  }
};
</script>

<style>
.table-manager {
  display: flex;
}

.left-panel {
  width: 40vw;
  margin-left: 20px;
}

.product-box {
  height: 500px;
  background-color: #ccc;
}

.return-arrow {
  margin-left: 10px;
  padding-top: 50px;
  font-size: 20px;
}
</style>