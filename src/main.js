import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import LoaderMixin from '@/mixins/loaderMixin'
import DataNotFound from '@/shared/components/DataNotFound'

import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)

Vue.component('data-not-found', DataNotFound)

Vue.mixin(LoaderMixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
