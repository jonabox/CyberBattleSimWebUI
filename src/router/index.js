import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Model from '../views/Model.vue'
import Details from '../views/Details.vue'
import Simulate from '../views/Simulate.vue'
import Agent from '../views/Agent.vue'
import Statistics from '../views/Statistics.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Model',
    component: Model
  },
  {
    path: '/Model',
    name: 'Model',
    component: Model,
  },
  {
    path: '/Details',
    name: 'Details',
    component: Details,
  },
  {
    path: '/Human_Player',
    name: 'Human Player',
    component: Simulate,
  },
  {
    path: '/AI_Learning',
    name: 'AI Learning',
    component: Agent,
  },
  {
    path: '/Statistics',
    name: 'Statistics',
    component: Statistics,
  },
  {
    path: '/about',
    name: 'About',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
