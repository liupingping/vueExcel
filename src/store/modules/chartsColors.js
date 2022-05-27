/** ***
 * echart 颜色配送表
 */
export default {
  colors: ['#007AFF', '#59F28E', '#00D7E9', '#ffd800', '#fa5349', '#a350ff',
    '#078888', '#ffb97b', '#ffb500', '#0051a4', '#029440', '#e51e2c', '#bf1993',
    '#7adcc5', '#a55b00', '#3c71fe', '#170798', '#006354'],
  // 柱状背景色
  barBg: 'rgba(91,143,249, .2)',
  // 蓝色圆形渐变
  bluePie: {
    type: 'radial',
    x: 0.5,
    y: 0.5,
    r: 0.5,
    colorStops: [
      { offset: 0, color: 'rgba(4, 34, 64, .2)' },
      { offset: 1, color: 'rgba(22, 251, 253, .3)' },
    ],
  },
  // 黄色圆形渐变
  yellowPie: {
    type: 'radial',
    x: 0.5,
    y: 0.5,
    r: 0.5,
    colorStops: [
      { offset: 0, color: 'rgba(4, 34, 64, .2)' },
      { offset: 1, color: 'rgba(255, 216, 0, .3)' },
    ],
  },
  // 橙色圆形渐变
  orangePie: {
    type: 'radial',
    x: 0.5,
    y: 0.5,
    r: 0.5,
    colorStops: [
      { offset: 0, color: 'rgba(4, 34, 64, .2)' },
      { offset: 1, color: 'rgba(255, 141, 0, .3)' },
    ],
  },
  // 绿色圆形渐变
  greenPie: {
    type: 'radial',
    x: 0.5,
    y: 0.5,
    r: 0.5,
    colorStops: [
      { offset: 0, color: 'rgba(4, 34, 64, .2)' },
      { offset: 1, color: 'rgba(80, 255, 162, .3)' },
    ],
  },
  // dataZoom
  dataZoom: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(19, 255, 255, .13)' },
      { offset: 1, color: 'rgba(22, 253, 255, .04)' },
    ],
  },
  dataZoomFill: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(19, 255, 255, .28)' },
      { offset: 1, color: 'rgba(22, 253, 255, .19)' },
    ],
  },
  // 蓝色渐变线区域图
  blueLine: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(2, 122, 255, .5)' },
      { offset: 1, color: 'rgba(5, 178, 255, .04)' },
    ],
  },
  // 绿色渐变线区域图
  greenLine: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(80, 255, 162, .5)' },
      { offset: 1, color: 'rgba(80, 255, 162, .04)' },
    ],
  },
  // 橙色渐变线区域图
  orangeLine: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(255, 141, 0, .5)' },
      { offset: 1, color: 'rgba(255, 141, 0, .04)' },
    ],
  },
  // 黄色渐变柱状图
  yellowLine: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(255, 216, 0, .85)' },
      { offset: 1, color: 'rgba(255, 216, 0, 0)' },
    ],
  },
  // 蓝色渐变柱状图
  blueBar: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(2, 122, 255, 1)' },
      { offset: 1, color: 'rgba(0, 197, 255, 0)' },
    ],
  },
  // 横向蓝色渐变柱状图
  blueHBar: {
    type: 'linear',
    x: 1,
    y: 0,
    x2: 0,
    y2: 0,
    colorStops: [
      { offset: 0, color: 'rgba(2, 122, 255, 1)' },
      { offset: 1, color: 'rgba(0, 197, 255, 0.1)' },
    ],
  },
  // 淡蓝色渐变柱状图
  lightBlueBar: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(22, 253, 255, 1)' },
      { offset: 1, color: 'rgba(22, 253, 255, 0)' },
    ],
  },
  // 绿色渐变柱状图
  greenBar: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(80, 255, 162, 1)' },
      { offset: 1, color: 'rgba(80, 255, 162, .1)' },
    ],
  },
  // 横向绿色渐变柱状图
  greenHBar: {
    type: 'linear',
    x: 1,
    y: 0,
    x2: 0,
    y2: 0,
    colorStops: [
      { offset: 0, color: 'rgba(80, 255, 162, 1)' },
      { offset: 1, color: 'rgba(80, 255, 162, .1)' },
    ],
  },
  // 橙色渐变柱状图
  orangeBar: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(255, 141, 0, 1)' },
      { offset: 1, color: 'rgba(255, 141, 0, .1)' },
    ],
  },
  orangeHBar: {
    type: 'linear',
    x: 1,
    y: 0,
    x2: 0,
    y2: 0,
    colorStops: [
      { offset: 0, color: 'rgba(255, 141, 0, 1)' },
      { offset: 1, color: 'rgba(255, 141, 0, .1)' },
    ],
  },
  // 黄色渐变柱状图
  yellowBar: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: 'rgba(255, 254, 78, 1)' },
      { offset: 1, color: 'rgba(255, 141, 0, .3)' },
    ],
  },
};
