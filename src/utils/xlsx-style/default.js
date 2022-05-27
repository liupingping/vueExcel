/**
 * 获取单元格样式表
 * 详情参见 https://www.npmjs.com/package/xlsx-style#cell-styles
 *
 * @param cell    td element
 * @param isFirst 第一行
 */
export function getDefaultStyle(cell, isFirst) {
  // let style = window.getComputedStyle(cell, null);
  return {
    // 背景颜色
    fill: {
      fgColor: {
        rgb: isFirst ? '429388' : 'FFFFFF',
      },
    },
    // 字体样式
    font: {
      sz: 16,
      bold: isFirst,
      color: {
        rgb: '000000',
      }
    },
    // 对齐方式
    alignment: {
      vertical: isFirst ? 'center' : '',
      horizontal: isFirst ? 'center' : ''
    },
    // 边框样式
    border: {
      top: {
        style: 'thin',
        color: {
          rgb: '429388'
        }
      },
      bottom: {
        style: 'thin',
        color: {
          rgb: '429388'
        }
      },
      left: {
        style: 'thin',
        color: {
          rgb: '429388'
        }
      },
      right: {
        style: 'thin',
        color: {
          rgb: '429388'
        }
      }
    }
  }
}
