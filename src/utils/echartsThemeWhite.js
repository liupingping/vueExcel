/**
 * @author: miya
 * @date: 2019/9/18
 * @description:echarts常用图表全局配置文件——白色背景
 */
// todo 待修改
import Colors from '@/store/modules/chartsColors';

export default {
  color: Colors.colors,
  backgroundColor: 'transparent',
  textStyle: {
    fontWeight: 500,
    fontFaminly: 'Source Han Sans',
  },
  title: {
    textStyle: {
      color: '#2d4066',
      fontSize: 14,
    },
    subtextStyle: {
      color: '#2d4066',
    },
  },
  line: {
    itemStyle: {
      normal: {
        borderWidth: 2,
        cursor: 'default',
      },
    },
    lineStyle: {
      normal: {
        width: 2,
      },
    },
    // 指示线
    label: {
      color: 'rgba(255, 255, 255, .7)',
      normal: {
        textStyle: {
          color: 'rgba(255, 255, 255, .7)',
          fontSize: 12,
        },
      },
    },
    symbol: 'none', // 默认emptyCircle
    smooth: false,
  },
  bar: {
    barGap: 4,
    itemStyle: {
      normal: {
        barBorderWidth: 0,
      },
      emphasis: {
        barBorderWidth: 0,
      },
    },
    // 指示线
    label: {
      color: '#2d4066',
      normal: {
        textStyle: {
          color: '#2d4066',
          fontSize: 12,
        },
      },
    },
    labelLine: {
      normal: {
        lineStyle: {
          color: '#e9f2ff',
        },
      },
    },
  },
  pie: {
    cursor: 'default',
    itemStyle: {
      normal: {
        borderWidth: 10,
      },
      emphasis: {
        borderWidth: 10,
      },
    },
  },
  categoryAxis: {
    nameTextStyle: {
      color: '#586f9c',
    },
    axiPointer: {
      type: 'shadow',
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: true,
      lineStyle: {
        color: '#e9f2ff',
        width: 1,
      },
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#2d4066',
        fontSize: 12,
      },
    },
    splitLine: {
      show: false,
      lineStyle: {
        color: '#e9f2ff',
        width: 1,
      },
    },
    splitArea: {
      show: false,
    },
  },
  dataZoom: {
    backgroundColor: Colors.dataZoom,
    borderColor: '#16fdff',
    fillerColor: Colors.dataZoom,
    handleStyle: {
      color: '#16fdff',
      borderColor: '#16fdff',
    },
    dataBackground: {
      lineStyle: {
        color: '#16fdff',
        opacity: 0.5,
      },
      areaStyle: {
        color: Colors.dataZoom,
      },
    },
  },
  // 数值类型的坐标轴
  valueAxis: {
    axisLine: {
      show: false,
      lineStyle: {
        color: '#e9f2ff',
        width: 1,
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#2d4066',
      },
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#e9f2ff',
        width: 1,
      },
    },
    nameTextStyle: { // 坐标轴名称的文字样式
      fontSize: 10,
      color: '#586f9c', // 颜色
      align: 'right',
    },
    type: 'value',
    min: 'dataMin',
    max: 'dataMax',
    minInterval: 1,
    splitNumber: 5,
    splitArea: {
      show: false,
    },
  },
  legend: {
    itemGap: 20, // 图例每项之间的间隔
    itemWidth: 19, // 图例标记的图形宽度
    itemHeight: 5, // 图例标记的图形高度
    icon: 'rect', // emptyCircle
    textStyle: {
      color: '#2d4066',
      fontWeight: 400,
      padding: [0, 0, 0, 3],
      // rich 应该写在这个位置，否则不会生效
    },
  },
  toolbox: {
    show: false,
    top: 5,
    right: 20,
    feature: {
      saveAsImage: {
        icon: 'path://M1016 384a50.432 50.432 0 0 0-99.968-9.088L915.19999999 384 915.2 787.2l-806.4 0 0-806.4L512-19.199999990000038c24.32 0 45.184-17.408 49.6-41.34400001l0.768-9.02399999c0-24.32-17.344-45.248-41.28-49.60000001l-9.088-0.832-453.632 0c-24.32 0-45.184 17.408-49.536 41.344l-0.832 9.088L8 837.632a50.432 50.432 0 0 0 41.344 49.536l9.024 0.832L965.568 888c24.32 0 45.248-17.408 49.6-41.344L1016 837.632 1016 384z m-0.832-242.94399999l0.832-9.02400001 0-202.88c0-1.92-0.192-4.096-0.512-6.208l0.512 7.488-0.32-5.376-1.408-7.55200001-1.984-6.39999999-4.032-7.616-4.032-5.568-3.072-3.2-4.096-3.71200001-6.272-4.22399999-6.016-3.072-6.27199999-1.984-8.32000001-1.536-4.608-0.192-201.6 0a50.432 50.432 0 0 0-9.02400001 99.968l9.02400001 0.832L844.03200001-19.200000000000045l-468.48000001 468.28799999a50.368 50.368 0 0 0 64.256 77.12000001l7.04-5.76L915.2 52.224000000000046l0 79.872a50.368 50.368 0 0 0 41.344 49.536L965.568 182.39999999999998c24.32 0 45.248-17.408 49.6-41.34399999z',
        backgroundColor: '#fff',
        iconStyle: {
          color: '#00ff99',
          borderColor: '#00ff99',
          borderWidth: 0,
        },
        emphasis: {
          iconStyle: {
            color: '#00ff99',
            borderColor: '#00ff99',
            textFill: '#00ff99',
            textPosition: 'bottom',
            textAlign: 'center',
          },
        },
      },
    },
  },
  tooltip: {
    axisPointer: {
      lineStyle: {
        color: '#7a84a0',
        width: 1,
      },
      crossStyle: {
        color: '#7a84a0',
        width: 1,
      },
    },
  },
};
