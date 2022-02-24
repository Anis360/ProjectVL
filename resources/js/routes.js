import ProductList from './components/ProductList.vue';
import CreateProduct from './components/CreateProduct.vue';
import EditProduct from './components/EditProduct.vue';
import ShoppingList from './components/ShoppingList.vue';

export const routes = [{
        name: 'home',
        path: '/prodlist',
        component: ProductList,
        children: [
            {
              name: 'edit',
              path: '/edit/:id',
              component: EditProduct
            }]
    },
   {
        name: 'create',
        path: '/create',
        component: CreateProduct
    },
/*    {
        name: 'edit',
        path: '/edit/:id',
        component: EditProduct
    },*/
    {
        name: 'shoplist',
        path: '/shoplist',
        component: ShoppingList
    },
];