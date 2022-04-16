<template>
  <div id="main" style="width:80%;height:400px"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts';
export default defineComponent({
  setup() {
    // 图标
    type EChartsOption = echarts.EChartsOption;

    onMounted(() => {
      // 周表
      var chartDom = document.getElementById('main')!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;
      option = {

        title: {
          text: '本周支出', // 主标题文本
          left: 'center', // 水平方向位置
          top: 'top', // 竖直方向位置
          show: true, // 是否显示标题
          textStyle: {
            color: 'skyblue', // 颜色
            fontStyle: 'italic', // 风格  斜体-italic、oblique
            fontWeight: 'lighter', // 粗细 细-lighter
            fontFamily: 'Courier New', // 字体系列
            lineHeight: 30,// 行高
            width: 100, // 文本显示宽度
            overflow: 'break', // 配合width
            height: 30, // 文本显示高度
            // textBorderColor: 'red', // 文字本身的描边颜色。 设置之后设置主副标题之间的间距无效

          },
          // 副标题文本样式
          // subtextStyle: {
          //   fontSize: 16,
          //   verticalAlign: 'center',
          // },
        },

        tooltip: {
          trigger: 'axis',
          // formatter: function (params) {
          //   let b = '<div style="color: #fff;margin-bottom: 5px">时间：' + params[0]['axisValue'] + ' mmol/L</div>' +
          //     '<div style="color: #fff;margin-bottom: 5px">支出' + params[0]['value'] + '</div>' 
          //   return b
          // }
          axisPointer: { type: 'cross' }
        },
        xAxis: {
          name: '时间', // 坐标轴名称
          nameLocation: 'end', //  坐标轴名称显示位置。
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          name: '支出',
          type: 'category'
        },
        series: [
          {
            name: '支出',
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      };
      option && myChart.setOption(option);
      window.onresize = function () {
        myChart.resize()
      }
      // 获取当前月份
      const month: number = new Date().getMonth() + 1
      const weekFirstDays: string = getCurrentWeekFirstDay(new Date())  // 获取本周第一天
      const weekLastDay: string = getCurrentWeekLastDay(new Date())   // 获取本周最后一天
    })
      // 获取本周第一天
      function getCurrentWeekFirstDay(date) {
        let weekFirstDay: any = new Date(date - (date.getDay() - 1) * 86400000)
        let firstMonth: string | number = Number(weekFirstDay.getMonth()) + 1

        if (firstMonth < 10) {
          firstMonth = '0' + firstMonth
        }
        let weekFirstDays = weekFirstDay.getDate();
        if (weekFirstDays < 10) {
          weekFirstDays = '0' + weekFirstDays;
        }
        return weekFirstDay.getFullYear() + '-' + firstMonth + '-' + weekFirstDays;
      }
      // 获取本周最后一天
      function getCurrentWeekLastDay(date) {
        let weekFirstDay: any = new Date(date - (date.getDay() - 1) * 86400000)
        let weekLastDay: any = new Date((weekFirstDay / 1000 + 6 * 86400) * 1000)
        let lastMonth: string | number = Number(weekLastDay.getMonth()) + 1
        if (lastMonth < 10) {
          lastMonth = '0' + lastMonth
        }
        let weekLastDays = weekLastDay.getDate();
        if (weekLastDays < 10) {
          weekLastDays = '0' + weekLastDays;
        }
        return weekFirstDay.getFullYear() + '-' + lastMonth + '-' + weekLastDays;
      }

  },

})
</script>
<style scoped>
</style>
