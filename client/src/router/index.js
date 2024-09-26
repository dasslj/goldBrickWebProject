import {createRouter, createWebHistory} from "vue-router"
import HelloWorld from "../components/HelloWorld.vue"
import chart from "../components/Chart.vue"
import devCtrlAndShow from "../components/devCtrlAndShow.vue"
import gauge from "../charts/gauge.vue"
import line from "../charts/line.vue"

const routes = [
    {name:"设备控制",path:"/devControl",component:HelloWorld},
    {name:"图表",path:"/chart",component:chart,
    children:[
            {name:"仪表盘",path:"gauge",component:gauge},
            {name:"折线图",path:"line",component:line},
            {path:"/chart",redirect:"/chart/gauge"}
        ]
    },
    {name:"设备控制加显示",path:"/devCtrlAndShow",component:devCtrlAndShow},
    {path:"/",redirect:"/devControl"}
]

const router = createRouter({
    
    history:createWebHistory(),
    routes:routes
})

export default router