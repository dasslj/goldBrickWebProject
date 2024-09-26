<!-- 本页是二级路由页 -->
<template>
  <div>
    <!-- <div class="nav">
    <router-link to="/chart/gauge">gauge (仪表盘页)</router-link>
    <router-link to="/chart/line">line (折线图页)</router-link>
    
  </div> -->
    <el-row class="main">
    <el-col :span="4">

      <el-menu
        background-color="#545c64"
        class="el-menu-vertical-demo"
        router="true"
        active-text-color="#ffd04b"
        text-color="#fff"
      >
      <div class="subTitleBox"><h3>图表页</h3></div>
      <el-menu-item index="/chart/gauge">gauge (仪表盘页)</el-menu-item>
      <el-menu-item index="/chart/line">line (折线图页)</el-menu-item>
      </el-menu>
    </el-col>
    <router-view></router-view>
  </el-row>
  </div>
</template>

<script setup>
</script>

<style scoped>
.main{
  flex-wrap: nowrap;
  flex-direction: row;
  margin:0;
}
.nav {
  display: flex;
  flex-direction: column;
}
a{
  text-decoration:none;
}
.subTitleBox{
  background-color: #3f454b;
  color: #fff;
  /* height: 40%; */
  text-align: start;
  padding-left: 1em;
  padding-top: 1em;
  padding-bottom: 1em;
  
  /* margin: 0; */
  /* padding: 1em; */
}
.subTitleBox h3 {
  margin: 0;
}
</style>