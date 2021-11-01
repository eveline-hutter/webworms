import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import Create from '@/views/Create.vue'
import Fetch from '@/views/Fetch.vue'
import Edit from '@/views/Edit.vue'
import Game from "@/views/Game.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/game",
    name: "game",
    component: Game,
  },
  {
    path: '/create',
    name: 'create',
    component: Create
  },
  {
    path: '/fetch',
    name: 'fetch',
    component: Fetch
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
