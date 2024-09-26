// 导入Pinia
import {defineStore} from "pinia"
import state from "./state.js"
import getters from "./getters.js"
import actions from "./actions.js"
const useShopStore = defineStore("shop",{
    state,
    getters,
    actions
})

export default useShopStore