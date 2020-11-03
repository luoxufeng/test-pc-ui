import Vue from 'vue'
import App from './App.vue'
import common from './utils/common'
import './plugins/element.js'
import YtoModal from './../packages/index' // 导入组件
import YtoTable from './../packages/index' // 导入组件
import YtoRegionChoose from './../packages/index' // 导入组件
import './styles/index.scss';

Vue.config.productionTip = false
Vue.use(common)
Vue.use(YtoModal) // 注册组件
Vue.use(YtoTable)
Vue.use(YtoRegionChoose)
new Vue({
  render: h => h(App),
}).$mount('#app')
