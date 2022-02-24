<template>
    <div>
        <h3 class="text-center">Create item</h3>
        <div class="row">
            <div class="col-md-6">
                <form @submit.prevent="additem">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" v-model="item.name">
                    </div>
                    <div class="form-group">
                        <label>Quantity</label>
                        <input type="text" class="form-control" v-model="item.quantity">
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input type="text" class="form-control" v-model="item.price">
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
        data() {
            return {
                item: {}
            }
        },
        methods: {
            additem() {
                this.axios
                    .post('http://localhost:8000/api/items', this.item)
                    .then(response => (
                        this.$router.push({ name: 'home' })
                    ))
                    .catch(err => console.log(err))
                    .finally(() => this.loading = false)
            }
        }
    }
</script>