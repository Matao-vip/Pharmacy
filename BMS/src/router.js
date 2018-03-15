import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

import home from './components/home.vue'
import users from './components/users/users.vue'
import header from './components/header/header.vue'
import products from './components/products/products.vue'
import indexPro from './components/indexPro/indexPro.vue'
import login from './components/login/login.vue'
import updata from './components/updata/updata.vue'
import updataIndex from './components/updataIndex/updataIndex.vue'

var router = new VueRouter({
    routes:[
        {
            path:'/',component: home,
            children:[
                {path:'/indexPro',component: indexPro},
                {path:'/header',component: header},
                {path:'/products',component: products},
                {path:'/users',component: users},
                {path:'/updata',component: updata,name:'updata'},
                {path:'/updataIndex',component: updataIndex,name:'updataIndex'}
            ]
        },
        {path:'/login',name:"login",component: login},
    ]
})
export default router;