<template>
    <div>
        <h2 class="text-center">Products list</h2>
        <div>
    <b-button @click="modalShow = !modalShow">Add</b-button>

    
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
                <tr v-for="product in products" :key="product.id">
                    <td>{{product.id}}</td>
                    <td>{{product.name}}</td>
                    <td>{{product.detail}}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <router-link :to="{name: 'edit', params: {id: product.id}}" class="btn btn-success">Edit</router-link>
                            <b-button :to="{name: 'edit', params: {id: product.id}}" class="btn btn-success" @click="modalShow1 = !modalShow1">Edit</b-button>
                            <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <b-modal v-model="modalShow" ><CreateProduct /></b-modal>
        <b-modal v-model="modalShow1" ><EditProduct /></b-modal>
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
           
          return{products:[], modalShow: false, modalShow1: false}
        },
       created(){
            this.axios.get('http://localhost:8000/api/products/').then(response => {
                this.products = response.data;
             });
        },
       methods:{
           deleteProduct(id){
                this.axios.delete('http://localhost:8000/api/products/${id}').then(response =>{
                    let i=this.products.map(data=>data.id).indexOf(id);
                    this.products.splice(i, 1)
                });
            }
        }
    } 
</script>
