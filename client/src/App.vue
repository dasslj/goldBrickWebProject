<template>
  <div>
    

    <el-menu
    
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router="true"
    default-active
    
    
    >
    <el-menu-item index="/devControl">设备控制页</el-menu-item>
    <el-menu-item index="/chart">图表页</el-menu-item>
    <el-menu-item index="/devCtrlAndShow">设备控制加显示</el-menu-item>
    </el-menu>

    <div>
    <router-view></router-view>
  </div>
  </div>
  
</template>

<script setup>
import {ref} from "vue"

const getKey = (key)=>{
  console.log(key)
  return key
}
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.navBox{
  width: 100%;
  height: 100%;
}
a{
  text-decoration:none;
}

</style>