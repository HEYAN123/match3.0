// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import VueQuillEditor from 'vue-quill-editor'
import Cookies from 'js-cookie'
import axios from 'axios'
import 'iview/dist/styles/iview.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.prototype.API = "http://120.79.141.169:8080/match2/api/"
Vue.prototype.axios = axios
Vue.prototype.Cookies = Cookies

Vue.config.productionTip = false

Vue.use(iView);
Vue.use(VueQuillEditor);
Vue.use(axios);
Vue.use(Cookies);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
