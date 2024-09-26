<template>
  <div class="main">
    <div class="Chart1" id="chart"></div>
    <div class="Chart2" id="chart"></div>
    <div class="Chart3" id="chart"></div>
  </div>
</template>
  
  <script setup>
import { onMounted, ref, inject, watch } from "vue";
import useShopStore from "../store/index.js";
import { storeToRefs } from "pinia";

const store = useShopStore();
const { devResult, devStatusList } = storeToRefs(store);

// 执行pinia，获取数据的函数
store.postServerData();

const $echarts = inject("echarts");

// const ws = new WebSocket("ws://127.0.0.1:3333")

const opt = (title = "", value = 0, max = 3.5, min = 0, unit = "Lux") => {
  return {
    title: {
      text: title,
    },
    series: [
      {
        type: "gauge",
        max,
        min,

        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, "#67e0e3"],
              [0.7, "#37a2da"],
              [1, "#fd666d"],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: "#fff",
            width: 2,
          },
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: "#fff",
            width: 4,
          },
        },
        axisLabel: {
          color: "inherit",
          distance: 40,
          fontSize: 20,
        },
        detail: {
          valueAnimation: true,
          formatter: `{value} ${unit}`,
          color: "inherit",
        },
        data: [
          {
            value,
          },
        ],
      },
    ],
  };
};

const initChart = (dir) => {
  const Chart = $echarts.init(document.querySelector(dir));
  return Chart;
};

onMounted(() => {
  let gzChart = initChart(".Chart1");
  let humChart = initChart(".Chart2");
  let tempChart = initChart(".Chart3");
  // 初始化图表
  // console.log(devResult.value.temp)
  gzChart.setOption(opt("光照感应", devResult.value.gz));
  humChart.setOption(opt("湿度感应", devResult.value.hum, 100, 0, "%"));
  tempChart.setOption(opt("温度感应", devResult.value.temp, 100, 0, "℃"));

  // 使用watch来带动图表
  watch(
    () => devResult,
    (newVal, oldVal) => {
      // console.log(newVal, oldVal);

      gzChart.setOption(opt("光照感应", devResult.value.gz));
      humChart.setOption(opt("湿度感应", devResult.value.hum, 100, 0, "%"));
      tempChart.setOption(opt("温度感应", devResult.value.temp, 100, 0, "℃"));
    },
    { immediate: true, deep: true }
  );

  // 没有pinia数据仓库时，获取数据的方法
  /*ws.onmessage = (e) =>{
    // console.log(e.data);
    if (e.data.includes(":")){
    // 设备状态返回值处理（设备控制页）
  
    // 设备数值返回值处理（图表页）
    // 数值型的返回值的特点是没有"_"
    if (!e.data.includes("_")){
      let msgList = e.data.split(":")
      switch(msgList[0]){
        case "gz":
          gzChart.setOption(opt("光照感应",(+msgList[1]).toFixed(2)));
          break;
        case "hum":
          humChart.setOption(opt("湿度感应",(+msgList[1]).toFixed(2),100,0,"%"));
          break;
        case "temp":
          tempChart.setOption(opt("温度感应",(+msgList[1]).toFixed(2),100,0,"℃"));
          break;
      }
    }
    
  }
    
  
  
  }
    */
});
</script>
  
  <style>
.main {
  width: 100%;
  display: Flex;
}
#chart {
  width: 400px;
  height: 400px;
}
</style>