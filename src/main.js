import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import App from './App'

import config from './config'
import routes from './routes'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.component('app', App)

const router = new VueRouter({
  mode: 'history',
  routes
})

Vue.http.interceptors.push((request, next) => {
  // Get the default auth headers from the config
  const headers = config.authHeaders()

  // Add the headers to each request
  for (var property in headers) {
    request.headers.set(property, headers[property])
  }

  next()
})

new Vue({
  router
}).$mount('#app')
