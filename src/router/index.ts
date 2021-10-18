import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Home from '../views/Home.vue'
import CreateGame from '@/views/CreateGame.vue'
import JoinGame from '@/views/JoinGame.vue'
import LevelEditor from '@/views/LevelEditor.vue'
import Settings from '@/views/Settings.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-game',
    name: 'createGame',
    component: CreateGame
  },
  {
    path: '/join-game',
    name: 'joinGame',
    component: JoinGame
  },
  {
    path: '/level-editor',
    name: 'levelEditor',
    component: LevelEditor
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
