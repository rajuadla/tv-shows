import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    alias: '/',
    component: () => import(/* webpackChunkName: "HomePage" */ '../views/HomePage.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "ShowSearch" */ '../views/ShowSearch.vue'),
    props: route => ({ searchText: route.query.q })
  },
  {
    path: '/shows/:genre',
    name: 'ListShows',
    component: () => import(/* webpackChunkName: "ListShows" */ '../views/ListShows.vue'),
    props: true
  },
  {
    path: '/show/:showid',
    name: 'Show',
    component: () => import(/* webpackChunkName: "showDetails" */ '../views/ShowDetails.vue'),
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    console.log(to, from, savedPosition)
    return { x: 0, y: 0 }
  }
})

export default router
