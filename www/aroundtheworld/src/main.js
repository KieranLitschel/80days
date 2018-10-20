import Vue from 'vue'
import App from './App.vue'
import Overview from './Overview.vue'
import Day from './Day.vue'
import Flight from './Flight.vue'

Vue.component('overview')
new Vue({
  el: '#app',
  render: h => h(App)
})
