import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'

import { CreateComponentType } from '@/packages/index.d'
import { RankChartConfig } from './index'
// 深拷贝
import cloneDeep from 'lodash/cloneDeep'
// 默认数据
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'grid']

const barName = "检测任务数";
export const seriesItem = {
  name: barName,
  type: "bar",
  barWidth: 10, // 柱子宽度
  MaxSize: 0,
  showBackground: true,
  backgroundStyle: {
    color: "#fff",
    borderRadius: 5, //设置背景的圆角
  },
  color: {
    type: "linear",
    x: 0,
    y: 0,
    x2: 1,
    y2: 0,
    colorStops: [
      {
        offset: 1,
        color: "#036afaff", // 0% 处的颜色
      },
      {
        offset: 0.5,
        color: "#034299ff"
      },
      {
        offset: 0,
        color: "#01142eff", // 100% 处的颜色
      },
    ],
    global: false, // 缺省为 false
  },
  label: {
    show: true,
    offset: [10, -15], // 标签偏移量
    color: "#050505f6",
    fontSize: 15,
    fontWeight: 500,
    position: "left",
    align: "left",
    formatter: function (params:any) {
      // console.log(params);
      return params.data.name;
    },
  },
};

const rankIcons = {
  icon1: "https://goviewpro.goviewlink.com/cloudStorageStatic/13190/rank1.png",
  icon2: "https://goviewpro.goviewlink.com/cloudStorageStatic/13190/rank2.png",
  icon3: "https://goviewpro.goviewlink.com/cloudStorageStatic/13190/rank3.png",
  icon: "https://goviewpro.goviewlink.com/cloudStorageStatic/13190/rank.png",
};

export const option = {
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "5%",
    right: "5%",
    top: "5%",
    bottom: "5%",
    containLabel: true,
  },
  xAxis: {
    type: "value",
    show: false,
  },
  yAxis: [
    {
      type: "category",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      inverse: true,
      axisLabel: {
        color: "#333",
        fontSize: 16,
        margin: 10,
        formatter: (name: any, index: number) => {
          const id = index + 1;
          if (id == 1) {
            return `{rank1|${id}}`;
          } else if (id == 2) {
            return `{rank2|${id}}`;
          } else if (id == 3) {
            return `{rank3|${id}}`;
          } else {
            return `{rank|${id}}`;
          }
        },
        rich: {
          rank1: {
            width: 25,
            height: 25,
            lineHeight: 25,
            fontSize: 16,
            align: "center",
            color: "#ffffff",
            padding: [0, 10, 0, 0],
            backgroundColor: {
              image: rankIcons.icon1,
            },
          },
          rank2: {
            width: 25,
            height: 25,
            lineHeight: 25,
            fontSize: 16,
            align: "center",
            color: "#ffffff",
            padding: [0, 10, 0, 0],
            backgroundColor: {
              image: rankIcons.icon2,
            },
          },
          rank3: {
            width: 25,
            height: 25,
            lineHeight: 25,
            fontSize: 16,
            align: "center",
            color: "#ffffff",
            padding: [0, 10, 0, 0],
            backgroundColor: {
              image: rankIcons.icon3,
            },
          },
          rank: {
            width: 25,
            height: 25,
            lineHeight: 25,
            fontSize: 16,
            align: "center",
            color: "#ffffff",
            padding: [0, 10, 0, 0],
            backgroundColor: {
              image: rankIcons.icon,
            },
          },
        },
      },
    },
    {
      type: "category",
      inverse: true,
      axisTick: "none",
      axisLine: "none",
      show: true,
      axisLabel: {
        textStyle: {
          // color: "#000000fd",
          color: "#333", // 文字颜色
          fontSize: 16,
        },
        formatter: function (value: any) {
          return value + "个";
        },
      },
      data: dataJson.source.map((item) => item.value),
    },
  ],
  
  series: [ seriesItem ],
  dataset: { ...dataJson }, // 数据集
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key: string = RankChartConfig.key
  public chartConfig = cloneDeep(RankChartConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
