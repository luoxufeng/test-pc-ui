import Vue from 'vue'
import App from './App.vue'
import common from './utils/common'
import './plugins/element.js'
import yto from './../packages/index' // 导入组件
import './styles/index.scss';

Vue.config.productionTip = false
Vue.use(common)
Vue.use(yto) // 注册组件
new Vue({
  render: h => h(App),
}).$mount('#app')
