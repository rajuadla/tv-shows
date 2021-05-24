import Vue from 'vue'
import VueRouter from 'vue-router'

import HomePage from '@/views/HomePage.vue'
import ShowSearch from '@/views/ShowSearch.vue'
import ListShows from '@/views/ListShows.vue'
import ShowDetails from '@/views/ShowDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    alias: '/',
    component: HomePage
  },
  {
    path: '/search',
    name: 'Search',
    component: ShowSearch,
    props: true
  },
  {
    path: '/shows/:genre',
    name: 'ListShows',
    component: ListShows,
    props: true
  },
  {
    path: '/show/:showid',
    name: 'Show',
    component: ShowDetails,
    props: true
  },
  {
    path: '*',
    redirect: { name: 'Home' }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

export default router
