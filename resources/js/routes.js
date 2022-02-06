import AllProduct from './components/AllProduct.vue';
import CreateProduct from './components/CreateProduct.vue';
import EditProduct from './components/EditProduct.vue';
import ShoppingCart from './components/ShoppingCart.vue';

export const routes = [{
        name: 'home',
        path: '/prodlist',
        component: AllProduct
    },
   {
        name: 'create',
        path: '/create',
        component: CreateProduct
    },
    {
        name: 'edit',
        path: '/edit/:id',
        component: EditProduct
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShoppingCart
    },
];