<template>
  <div>
    <!-- {{ dataLineList.temp }}<br/>
        {{ dataLineList.gz }}<br/>
        {{ dataLineList.hum }}<br/>
        {{ dataLineList.time }}<br/> -->
    <div id="lineChart"></div>
  </div>
</template>

<script setup>
import { onMounted, inject, watch } from "vue";
import useShopStore from "../store/index.js";
import { storeToRefs } from "pinia";
const store = useShopStore();

const { dataLineList } = storeToRefs(store);
// 调用echarts
const $echarts = inject("echarts");
store.postServerData();

const initChart = (dom = "") => {
  return $echarts.init(document.querySelector(dom));
};

const lineOpt = (dataList) => {
  return {
    title: {
      text: "设备数据折线图",
    },
    legend: {},
    tooltip: {
      show: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [...dataList.value.time],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "hum",
        type: "line",
        stack: "Total",
        data: [...dataList.value.hum],
      },
      {
        name: "temp",
        type: "line",
        stack: "Total",
        data: [...dataList.value.temp],
      },
      {
        name: "gz",
        type: "line",
        stack: "Total",
        data: [...dataList.value.gz],
      },
    ],
  };
};

onMounted(() => {
  console.log([...dataLineList.value.time]);
  let lineChart = initChart("#lineChart");
  lineChart.setOption(lineOpt(dataLineList));

  watch(
    () => dataLineList,
    (newVal, oldVal) => {
      lineChart.setOption(lineOpt(dataLineList));
    },
    { immediate: true, deep: true }
  );
});
</script>

<style scoped>
#lineChart {
  height: 400px;
  width: 1000px;
  /* background-color: red; */
}
</style>