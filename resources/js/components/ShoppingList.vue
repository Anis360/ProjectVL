<template>
    <div>
        <h2 class="text-center">Items list</h2>
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
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in filteredRows" :key="item.id">
                    <td>{{item.id}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.quantity}}</td>
                    <td>{{item.price}}</td>
                    <td>
                        <div class="btn-group" role="group">
                            <router-link :to="{name: 'edit', params: {id: item.id}}" class="btn btn-success" @click.native="modalShow1 = !modalShow1">Edit</router-link>
                            <button class="btn btn-danger" @click="deleteitem(item.id)">Delete</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <b-modal v-model="modalShow" ><NewItem /></b-modal>
        <b-modal v-model="modalShow1" ><router-view> </router-view></b-modal>
    </div>
</template>

<script>
import NewItem from './NewItem'
import Edititem from './Edititem'
    export default{
        name: 'App',
  components: {
    NewItem, Edititem
  },
       data(){
           
          return{items:[],  filter:'', modalShow: false, modalShow1: false}
        },
       created(){
            this.axios.get('http://localhost:8000/api/items/').then(response => {
                this.items = response.data;
             });
            /*this.axios.get(`http://localhost:8000/api/items/${this.$route.params.id}`).then((res)=> 
                    {this.item = res.data;});*/
                 
        },
        
        
       methods:{
           
           deleteitem(id){
                this.axios.delete('http://localhost:8000/api/items/${id}').then(response =>{
                    let i=this.items.map(data=>data.id).indexOf(id);
                    this.items.splice(i, 1)
                });
            }
        },
        computed: {
  filteredRows() {
    return this.items.filter(item => {
      const name = item.name.toString().toLowerCase();
      const searchTerm = this.filter.toLowerCase();

      return name.includes(searchTerm);
    });
  }
},

    } 
</script>
