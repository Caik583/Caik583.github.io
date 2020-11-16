import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'lib-flexible/flexible'
import 'vant/lib/index.css';


axios.defaults.withCredentials = true// 允许跨域设置，不然可能因为拿不到cookie而报错

axios.defaults.baseURL = 'http://localhost:3000/'

import { 
  Button,
  NavBar,
  Icon, 
  Search ,
  Loading ,
  Swipe, 
  SwipeItem,
  Popup,
  Cell
} from 'vant';



Vue.config.productionTip = false

Vue.use(VueAxios,axios)

Vue
  .use(Button)
  .use(NavBar)
  .use(Icon)
  .use(Search)
  .use(Loading)
  .use(Swipe)
  .use(SwipeItem)
  .use(Popup)
  .use(Cell)




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
