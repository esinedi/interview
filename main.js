import App from './App'
// 导入自定义导航栏组件
import CustomNavbar from '@/components/CustomNavbar'
// 导入自定义函数封装接口
import cloudApi from './common/cloudApi.js'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
// 注册全局组件
Vue.component('custom-navbar', CustomNavbar)
Vue.config.productionTip = false
Vue.prototype.$cloudApi = cloudApi
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif