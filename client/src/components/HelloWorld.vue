<template>
  <div>
    <!-- <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <el-text>
            风扇设备控制
          </el-text>
          <el-divider />
          <div class="box">
            <el-text>
              室内温度：{{ devResulf.temp }}℃
            </el-text>
            
          </div>
          <el-row :gutter="20" class="btn_box">
              <el-col :span="12">
                风扇开关
              </el-col>
              <el-col :span="12">
                <el-switch v-model="devStatusList.fs_status" inline-prompt :active-icon="Check" :inactive-icon="Close"
                  @change="sendDevControlMsg('fs', devStatusList.fs_status)"></el-switch>
              </el-col>
            </el-row>
        </el-card>
        
        
        <el-card>
          <el-text>
            LED设备控制
          </el-text>
          <el-divider />
          <div class="box">
            <el-text>
              室内照明：{{ devResulf.gz }}Lux
            </el-text>
            
          </div>
          <el-row :gutter="20" class="btn_box">
              <el-col :span="12">
                LED灯开关
              </el-col>
              <el-col :span="12">
                <el-switch v-model="devStatusList.led_status" inline-prompt active-text="开" inactive-text="关"
        @change="sendDevControlMsg('led', devStatusList.led_status)"></el-switch>
              </el-col>
            </el-row>
        </el-card>

      </el-col>
    </el-row> -->
    <div>
      风扇：
      <el-switch
        v-model="devStatusList.fs_status"
        inline-prompt
        :active-icon="Check"
        :inactive-icon="Close"
        @change="sendDevControlMsg('fs', devStatusList.fs_status)"
      ></el-switch>
    </div>
    <div>
      灯光：
      <el-switch
        v-model="devStatusList.led_status"
        inline-prompt
        active-text="开"
        inactive-text="关"
        @change="sendDevControlMsg('led', devStatusList.led_status)"
      ></el-switch>
    </div>
    <!-- <div>
      舵机：
      <el-switch
        v-model="devStatusList.dj_status"
        inline-prompt
        active-text="开"
        inactive-text="关"
        @change="sendDevControlMsg('dj', devStatusList.dj_status)"
      ></el-switch>
    </div> -->
    <div>
      光照感应器：
      <el-switch
        v-model="devStatusList.gz_status"
        inline-prompt
        active-text="开"
        inactive-text="关"
        @change="sendDevControlMsg('gz', devStatusList.gz_status)"
      ></el-switch>
      光照强度：{{ devResult.gz }}
    </div>
    <div>
      温湿度感应器：
      <el-switch
        v-model="devStatusList.temp_status"
        inline-prompt
        active-text="开"
        inactive-text="关"
        @change="sendDevControlMsg('temp', devStatusList.temp_status)"
      ></el-switch>
      温度：{{ devResult.temp }}, 湿度：{{ devResult.hum }}
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Close, Check, Camera } from "@element-plus/icons-vue";
// 使用pinia获取服务器数据
// 导入pinia库
import { storeToRefs } from "pinia";
// 导入pinia配置,是一个函数
import useShopStore from "../store/index.js";
const ws = new WebSocket("ws://localhost:3333");
const store = useShopStore();
const { devStatusList, devResult } = storeToRefs(store);
store.postServerData();

const sendDevControlMsg = (devType = "", devStatus = false) => {
  let msg = "";
  devStatus = devStatus ? "on" : "off";
  msg = devType + ":" + devStatus;

  ws.send(JSON.stringify(msg));
};

// 下面是没有pinia数据仓库及状态管理工具的获取服务器数据方法
/**
 * 
 const devStatusList = reactive({
  fs_status: false,
  led_status: false,
  dj_status: false,
  gz_status: false,
  temp_status: false,
})

const devResulf = reactive({
  gz: 0,
  temp: 0,
  hum: 0
})


const ws = new WebSocket("ws://localhost:3333");

const sendDevControlMsg = (devType = "", devStatus = false) => {
  let msg = "";
  devStatus = devStatus ? "on" : "off";
  msg = devType + ":" + devStatus;

  ws.send(JSON.stringify(msg));
};
// 

// 接收消息的函数
ws.onmessage = (e) => {
  // console.log(e.data);
  if (e.data.includes(":")) {


    // 设备状态返回值处理（设备控制页）
    // 设备控制的一般格式是"fs_status:0"
    // 所以使用"_"作为标记设备控制的入口标记
    if (e.data.includes("_")) {
      let msgList = e.data.split(":")
      switch (msgList[0]) {
        case "fs_status":
          devStatusList.fs_status = +msgList[1] ? true : false;
          break;
        case "led_status":
          devStatusList.led_status = +msgList[1] ? true : false;
          break;
        case "dj_status":
          devStatusList.dj_status = +msgList[1] ? true : false;
          break;
        case "gz_status":
          devStatusList.gz_status = +msgList[1] ? true : false;
          if (!+msgList[1]) {
            devResulf.gz = 0
          };
          break;
        case "temp_status":
          devStatusList.temp_status = +msgList[1] ? true : false;
          if (!+msgList[1]) {
            devResulf.temp = 0
            devResulf.hum = 0
          };
          break;
      }

    } else { // 设备数值返回值处理（图表页）
      let msgList = e.data.split(":")
      // console.log(e.data)
      switch (msgList[0]) {
        case "gz":
          devResulf.gz = (+msgList[1]).toFixed(2)
          break;
        case "temp":
          devResulf.temp = (+msgList[1]).toFixed(2)
          break;
        case "hum":
          devResulf.hum = (+msgList[1]).toFixed(2)
          break;
      }
    }



  }


};
 
 */
</script>

<style>
.el-text {
  font-size: 16px;
}

.box {
  border: 2px solid #e3e3e3;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn_box .el-col {
  text-align: center;
  margin-top: 20px;
}
.el-col {
  margin-bottom: 20px;
}
</style>