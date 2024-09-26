import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from "./router/index.js";
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import * as echarts from "echarts"
// 导入pinia
import {createPinia} from "pinia"

const app = createApp(App)
// pinia数据仓库配置
const pinia = createPinia();
app.use(pinia)
// 注册element-plus组件配置
app.use(ElementPlus)
// 注册vue-router组件配置
app.use(router)
// 注册echarts组件配置
app.provide("echarts",echarts)



app.mount('#app')
