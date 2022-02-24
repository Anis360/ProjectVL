<template>
    <div>
        <h2 class="text-center">Products list</h2>
        <div align="right">
    <b-button @click="modalShow = !modalShow">Add</b-button>
<input type="text" 
         placeholder="Filter"
         v-model="filter" />
    
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
                            <router-link :to="{name: 'edit', params: {id: product.id}}" class="btn btn-success" @click.native="modalShow1 = !modalShow1">Edit</router-link>
                            <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <b-modal v-model="modalShow" ><CreateProduct /></b-modal>
        <b-modal v-model="modalShow1" ><router-view> </router-view></b-modal>
    </div>
</template>

<script>
import CreateProduct from './CreateProduct'
import EditProduct from './EditProduct'
    export default{
        name: 'App',
  components: {
    CreateProduct, EditProduct
  },
       data(){
           
          return{products:[],  filter:'', modalShow: false, modalShow1: false}
        },
       created(){
            this.axios.get('http://localhost:8000/api/products/').then(response => {
                this.products = response.data;
             });
            /*this.axios.get(`http://localhost:8000/api/products/${this.$route.params.id}`).then((res)=> 
                    {this.product = res.data;});*/
                 
        },
        
        
       methods:{
           
           deleteProduct(id){
                this.axios.delete('http://localhost:8000/api/products/${id}').then(response =>{
                    let i=this.products.map(data=>data.id).indexOf(id);
                    this.products.splice(i, 1)
                });
            }
        },
        computed: {
  filteredRows() {
    return this.products.filter(product => {
      const name = product.name.toString().toLowerCase();
      const detail = product.detail.toString().toLowerCase();
      const searchTerm = this.filter.toLowerCase();

      return name.includes(searchTerm) ||
        detail.includes(searchTerm);
    });
  }
},

    } 
</script>
