/* eslint-disable */

"use strict"

import {getDefaultStyle} from "../xlsx-style/default"

// require("./Blob")
require("script-loader!file-saver")
require("script-loader!xlsx-style/dist/xlsx.full.min")

function generateArray(table, getStyle = getDefaultStyle) {
  var out = []
  var rows = table.querySelectorAll("tr")
  var ranges = []
  for (var R = 0, Rl = rows.length; R < Rl; ++R) {
    var outRow = []
    var row = rows[R]
    var columns = row.querySelectorAll("th,td")
    for (var C = 0, Cl = columns.length; C < Cl; ++C) {
      var cell = columns[C]
      var colspan = cell.getAttribute("colspan")
      var rowspan = cell.getAttribute("rowspan")
      var cellValue = cell.innerText
      if (cellValue !== "" && cellValue == +cellValue) {
        cellValue = +cellValue
      }

      //Skip ranges
      ranges.forEach(function (range) {
        if (R >= range.s.r && R <= range.e.r && outRow.length >= range.s.c && outRow.length <= range.e.c) {
          for (var i = 0, l = range.e.c - range.s.c; i <= l; ++i) {
            outRow.push(null)
          }
        }
      })

      //Handle Row Span
      if (rowspan || colspan) {
        rowspan = rowspan || 1
        colspan = colspan || 1
        ranges.push({
          s: Object.assign(getStyle(cell, R === 0), {
            r: R,
            c: outRow.length
          }),
          e: {
            r: R + rowspan - 1,
            c: outRow.length + colspan - 1
          }
        })
      }

      //Handle Value
      outRow.push(cellValue !== "" ? {
        v: cellValue,
        s: getStyle(cell, R === 0)
      } : null)

      //Handle Colspan
      if (colspan) {
        for (var k = 0; k < colspan - 1; ++k) {
          outRow.push(null)
        }
      }
    }
    out.push(outRow)
  }
  return [out, ranges]
}

function datenum(v, date1904) {
  if (date1904) v += 1462
  var epoch = Date.parse(v)
  return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000)
}

function sheet_from_array_of_arrays(data, getStyle = getDefaultStyle) {
  var cols = []
  var ws = {
    "!cols": cols
  }
  var range = {
    s: { // 开始
      c: 10000000,
      r: 10000000
    },
    e: { // 结束
      c: 0,
      r: 0
    }
  }
  for (var R = 0, Rl = data.length; R != Rl; ++R) {
    for (var C = 0, Cl = data[R].length; C != Cl; ++C) {
      if (range.s.r > R) {
        range.s.r = R
      }
      if (range.s.c > C) {
        range.s.c = C
      }
      if (range.e.r < R) {
        range.e.r = R
      }
      if (range.e.c < C) {
        range.e.c = C
      }

      // var cell = {v: cobj};
      var cell = data[R][C]
      if (cell == null) {
        cell = {
          v: ""
        }
      } else if (typeof cell !== "object") {
        cell = {
          v: cell
        }
      }

      if (typeof cell.s !== "object") {
        cell.s = getStyle(null, R === 0)
      }

      var cell_ref = XLSX.utils.encode_cell({
        c: C,
        r: R
      })

      if (typeof cell.v === "number") {
        cell.t = "n"
      } else if (typeof cell.v === "boolean") {
        cell.t = "b"
      } else if (cell.v instanceof Date) {
        cell.t = "n"
        cell.z = XLSX.SSF._table[14]
        cell.v = datenum(cell.v)
      } else {
        cell.t = "s"
        // 计算每一个单元格宽度，取最大值
        if (typeof cell.v === "string") {
          var wpx = cell.v.length * 20
          cols[C] = {
            wpx: cols[C] ? Math.max(cols[C].wpx, wpx) : wpx
          }
        }
      }

      ws[cell_ref] = cell
    }
  }
  if (range.s.c < 10000000) {
    ws["!ref"] = XLSX.utils.encode_range(range)
  }
  return ws
}

function Workbook() {
  this.SheetNames = []
  this.Sheets = {}
}

function s2ab(s) {
  var buf = new ArrayBuffer(s.length)
  var view = new Uint8Array(buf)
  for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}

function formatJson(list, header) {
  return list.map(v => header.map(i => v[i]))
}

/**
 * 导出table为excel
 *
 * @param id        table id或element
 * @param filename  文件名
 * @param sheetName sheet名
 * @param getStyle  设置单元格样式的回调方法
 */
export function exportTable2Excel(id, filename = "demo", sheetName = "SheetJS", getStyle = getDefaultStyle) {
  var theTable = typeof id === "string" ? document.getElementById(id) : id
  if (!theTable) {
    return
  }

  var oo = generateArray(theTable, getStyle)
  var ranges = oo[1]

  /* original data */
  var data = oo[0]
  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data, getStyle)

  /* add ranges to worksheet */
  // ws['!cols'] = ['apple', 'banan'];
  ws["!merges"] = ranges
  // return;

  /* add worksheet to workbook */
  wb.SheetNames.push(sheetName)
  wb.Sheets[sheetName] = ws

  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: false,
    type: "binary"
  })

  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), filename + ".xlsx")
}

/**
 * 导出JSON为excel
 *
 * @param titles    title列表
 * @param keys      key列表
 * @param list      list数据
 * @param filename  文件名
 * @param sheetName sheet名
 * @param getStyle  设置单元格样式的回调方法
 */
export function exportJson2Excel(titles, keys, list, filename = "列表", sheetName = "SheetJS", getStyle = getDefaultStyle) {
  var data = formatJson(list, keys)
  if (!titles[1].splice) {
    data.unshift(titles)
  } else {
    titles.forEach(title => {
      data.unshift(title)
    })
  }

  var wb = new Workbook(),
    ws = sheet_from_array_of_arrays(data, getStyle)

  /* add worksheet to workbook */
  wb.SheetNames.push(sheetName)
  wb.Sheets[sheetName] = ws

  var wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: false,
    type: "binary"
  })
  saveAs(new Blob([s2ab(wbout)], {
    type: "application/octet-stream"
  }), filename + ".xlsx")
}
