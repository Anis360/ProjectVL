<template>
  <section>
    <h2 class="text-center">Products list</h2>
    <div>
      <b-button @click="showAddModalComponent">Add</b-button>
      <input type="text" placeholder="Filter" v-model="filter"/>
    </div>

    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Detail</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in filteredRows" :key="product.id">
        <td>{{product.id}}</td>
        <td>{{product.name}}</td>
        <td>{{product.detail}}</td>
        <td>
          <div class="btn-group" role="group">
            <b-button class="btn btn-success" @click="showEditModalComponent(product.id)">
              Edit
            </b-button>
            <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <b-modal v-model="showAddModal">
      <CreateProduct/>
    </b-modal>
    <EditProduct :editProductId = "editProductId" v-model="showEditModal"/>
  </section>
</template>

<script>
import CreateProduct from './CreateProduct'
import EditProduct from './EditProduct'

export default {
  name: 'App',
  components: {
    CreateProduct,
    EditProduct
  },

  data () {
    return {
      products: [],
      filter: '',
      editProductId: 0,
      showAddModal: false,
      showEditModal: false
    }
  },
  created () {
    this.axios.get('http://localhost:8000/api/products/').then(response => {
      this.products = response.data
    })
  },

  methods: {
    deleteProduct (id) {
      this.axios.delete('http://localhost:8000/api/products/${id}').then(response => {
        // Todo replace this with an actual backend call (axios.get('url_for_all_products'))
        let i = this.products.map(data => data.id).indexOf(id)
        this.products.splice(i, 1)
      })
    },

    showAddModalComponent () {
      this.showAddModal = true;
    },

    showEditModalComponent (productId) {
      this.showEditModal = true;
      this.editProductId = productId
    }
  },

  computed: {
    filteredRows () {
      return this.products.filter(product => {
        const name = product.name.toString().toLowerCase()
        const detail = product.detail.toString().toLowerCase()
        const searchTerm = this.filter.toLowerCase()
        return name.includes(searchTerm) || detail.includes(searchTerm)
      })
    }
  }
}
</script>
