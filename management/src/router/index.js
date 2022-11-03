import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../view/Home'
import User from '../view/User'
import Main from '../view/Main'
import Mall from '../view/Mall'
import PageOne from '../view/PageOne'
import PageTwo from '../view/PageTwo'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
        redirect:'/home',
        children: [
            { path: 'home', name:'home', component: Home },
            { path: 'user',name:'user', component: User },
            { path: 'mall',name:'mall', component: Mall },
            { path: 'Page1',name:'page1', component: PageOne },
            { path: 'Page2',name:'page2', component: PageTwo }
        ]
    }

]

const router = new VueRouter({
    routes
})

export default router