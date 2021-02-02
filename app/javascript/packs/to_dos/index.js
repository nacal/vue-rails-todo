import Vue from 'vue'
import Vuetify from "vuetify"
import "vuetify/dist/vuetify.min.css"
import ToDoIndex from '../../to_dos/index.vue'

Vue.use(Vuetify)
const vuetify = new Vuetify()

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    vuetify,
    render: h => h(ToDoIndex)
  }).$mount()
  document.body.appendChild(app.$el)
})
