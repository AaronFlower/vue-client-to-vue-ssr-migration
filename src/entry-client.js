/**
 * 创建一个 Vue 实例，挂载到指定元素上。
 */
import {createApp} from './app'

const {app} = createApp()

app.$mount('#app')

console.log('entry-client')
