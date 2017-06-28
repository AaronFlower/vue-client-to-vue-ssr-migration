import Vue from 'vue'
import App from './App.vue'

/**
 * 项目程序需要一个工厂，router, store 也是一样的。
 */

export function createApp (context) {
  const app = new Vue({
    render: h => h(App)
  })
  return {app}
}
