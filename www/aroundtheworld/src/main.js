import Vue from 'vue'
import App from './App.vue'
import Overview from './Overview.vue'
import Day from './Day.vue'
import Flight from './Flight.vue'

var vm = new Vue({
    el: '#app',
    data: { a: 1 },
    methods: {
      plus: function () {
        this.a++
      },
    },
    render: h => h(App)
  });

function redraw() {
  console.log("redrawing");
  vm.plus();
  console.log(vm.a)
}
