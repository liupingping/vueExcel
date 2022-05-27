const request = require('request');
const fs = require('fs');

class WriteApiToFile {
  constructor() {

  }

  createFile(filename, data, type, callback) {
    fs.writeFileSync(filename, data, type, callback);
  }

  requestToSwagger(url, callback) {
    request(url, callback);
  }

  // 首字母大写
  toUpperCaseFirst(str) {
    return str.replace(/\b\w+\b/g, (word) => word.substring(0, 1).toUpperCase() + word.substring(1));
  }

  // 驼峰
  toTitleCase(apiName, subKey) {
    if (apiName.length > 1) {
      if (apiName[apiName.length - 1] === 'findList') {
        const reg = /[A-Z]/;
        const index = apiName[apiName.length - 1].search(reg);
        apiName = apiName[apiName.length - 1].replace(/\b\w+\b/g, (word) => word.substring(0, index) + this.toUpperCaseFirst(apiName[apiName.length - 2]) + word.substring(index, index + 1).toUpperCase() + word.substring(index + 1));
      } else {
        if (subKey === 'get') {
          apiName = `get${this.toUpperCaseFirst(apiName[apiName.length - 1])}`;
        } else {
          const reg = /[A-Z]/;
          const index = apiName[apiName.length - 1].search(reg);
          if (index > -1) {
            apiName = apiName[apiName.length - 1].replace(/\b\w+\b/g, (word) => word.substring(0, index) + word.substring(index, index + 1).toUpperCase() + word.substring(index + 1));
          } else {
            apiName = apiName[apiName.length - 1] + this.toUpperCaseFirst(apiName[apiName.length - 2]);
          }
        }
      }
    }
    return apiName;
  }
}
const baseUrl = 'http://10.223.56.180';

// 请求swagger服务
const writeApi = new WriteApiToFile();
writeApi.requestToSwagger(`${baseUrl}/swagger-resources`, (error, response, body) => {
  const result = JSON.parse(body);
  const errCollect = [];
  const successList = [];
  // let defaultText = `import { axios } from "@/request/axios.js";\n`
  const defaultText = 'import HttpRequest from \'@/utils/httpRequest\'\n';
  for (let i = 0, j = result.length; i < j; i++) {
    const { location } = result[i];
    const currentFileName = result[i].name;
    const urlImport = '';
    writeApi.requestToSwagger(`${baseUrl}${location}`, (err, res, responseUrl) => {
      if (responseUrl[0] === '<') {
        errCollect.push({
          url: `${baseUrl}/${currentFileName}/v2/api-docs`,
          describe: '此接口获取失败',
        });
        writeApi.createFile(`src/api/${currentFileName}.js`, '该接口404', 'utf8', (err) => {
          console.log(err);
        });
      } else {
        const resultUrlList = JSON.parse(responseUrl);
        let currentFileApiStr = '';
        const apiNameList = [];
        if (resultUrlList.basePath != '') { // 异常服务
          // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~服务异常,可在src/api/errorlog.json内查看~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
          // fs.exists('src/api1/' + 'errorlog' + '.json', (exists) => {
          //   if (exists) {
          //     fs.readFile('src/api1/' + 'errorlog' + '.json', 'utf8', (err, data) => {
          //       console.log(data)
          //       writeApi.createFile('src/api1/' + 'errorlog' + '.json', data + JSON.stringify(resultUrlList) + '\n', 'utf8', (err1) => {
          //         console.log(err1)
          //       })
          //     })
          //   } else {
          //     writeApi.createFile('src/api1/' + 'errorlog' + '.json', JSON.stringify(resultUrlList) + '\n', 'utf8', (err) => {
          //       console.log(err)
          //     })
          //   }
          // })
        }
        for (const key in resultUrlList.paths) {
          for (const subKey in resultUrlList.paths[key]) {
            if (subKey === 'get' || subKey === 'post') {
              // 暂不支持除 get 和post 请求
              let apiName = key.slice(1).split(/\/\{|\}|\/|\./).join('_').replace(/\_$/, '');
              // 防止重复的方法
              if (apiNameList.findIndex((n) => n === apiName) === -1 && apiName.indexOf('app_') !== -1) {
                const dataType = subKey === 'get' ? 'params' : 'data';
                let rowData;
                let basepath = resultUrlList.basePath;
                basepath = basepath === '/' ? '' : basepath;
                if (apiName.indexOf('Export') > -1 || apiName.indexOf('export') > -1 || apiName.indexOf('download') > -1) {
                  rowData = `export const ${apiName} = (${dataType}={},config={}) => HttpRequest.request({url:'${basepath}${key}',method: '${subKey}',${dataType},...config})//${resultUrlList.paths[key][subKey].summary}\n`;
                } else {
                  rowData = `export const ${apiName} = (${dataType}={},config={}) => HttpRequest.request({url:'${basepath}${key}',method: '${subKey}',${dataType},...config})//${resultUrlList.paths[key][subKey].summary}\n`;
                }
                if (rowData.indexOf('{id}') > -1) {
                  rowData.match(/[_|\/]{[^=}]+}/g).map((item) => {
                    if (item.indexOf('/') > -1) {
                      rowData = rowData.replace(item, '/');
                    } else if (item.indexOf('_') > -1) {
                      rowData = rowData.replace(item, '');
                    }
                  });
                  apiName = apiName.replace(/_{[^=}]+}/g, '');
                }
                currentFileApiStr += rowData;
                apiNameList.push(apiName);
              }
            }
          }
        }
        if (currentFileApiStr) {
          writeApi.createFile(`src/api/${currentFileName}.js`, defaultText + urlImport + currentFileApiStr, 'utf8', (err) => {
          });
        }
      }
    });
  }
});
