import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Model from '../views/Model.vue'
import Details from '../views/Details.vue'
import Simulate from '../views/Simulate.vue'
import Agent from '../views/Agent.vue'
import Statistics from '../views/Statistics.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
    path: '/Simulate',
    name: 'Simulate',
    component: Simulate,
  },
  {
    path: '/Agent',
    name: 'Agent',
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
