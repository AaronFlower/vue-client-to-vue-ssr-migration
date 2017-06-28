import Vue from 'vue'
import App from './App.vue'
import {createRoute} from './router'
/**
 * 项目程序需要一个工厂，router, store 也是一样的。
 */

export function createApp (context) {
  let router = createRoute()

  const app = new Vue({
    router,
    render: h => h(App)
  })
  return {app}
}
