import { imExcelModel_exportExcelModel, commFileUploadsConf_getFileUrl } from '@/api/api-hnxt-poi';
// import config from '@/config'
import axios from 'axios';
import Message from './message';

const env = process.env;
// base64转blob
function dataURIToBlob(dataURL, fileName) {
  const bstr = atob(dataURL.split(',')[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr]);
  download(blob, fileName);
}

function download(blob, fileName) {
  const URL = window.URL || window.webkitURL;
  const link = document.createElement('a');
  if ('download' in link) { // 非IE浏览器
    link.download = fileName;
    link.style.display = 'none';
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  } else {
    navigator.msSaveBlob(blob, fileName);
  }
}

/**
 * 下载模板
 *
 * @param modelNo
 * @param fileName
 */
export const downloadTemplate = ({ modelNo, fileName }) => {
  imExcelModel_exportExcelModel({
    modelNo,
    fileName,
  }, { responseType: 'arraybuffer' }).then((json) => {
    downloadBuffer(json, fileName, '.xls', true);
  });
};

/**
 * 下载二进制流
 *
 * @param json
 * @param fileName
 */
export const downloadBuffer = (json, fileName, format = '.xls', error = false) => {
  const { data } = json;
  return new Promise((resolve, reject) => {
    const b = new Blob([data]);
    const r = new FileReader();
    r.readAsText(b, 'utf-8');
    r.onload = function () {
      if (r.result.indexOf('"successful":false,') === -1) {
        downloadCsv(data, fileName, format);
        resolve(data);
      } else {
        const res = JSON.parse(r.result);
        error && Message.error(`下载失败：${res.resultHint}`);
        reject(res);
      }
    };
  });
};
// 下载word
export const downloadWord = (json, fileName) => {
  const { data } = json;
  return new Promise((resolve, reject) => {
    const b = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.wodprocessingml.document;charset=utf-8' });
    const d = document.createElement('a');
    href = window.URL.createObjectURL(b);
    d.href = href;
    d.download = `${fileName}.doc`;
    document.body.appendChild(d);
    d.click();
    document.body.removeChild(d);
    window.URL.revokeObjectURL(href);
  });
};
/**
 * 下载文件
 *
 * @param configId
 * @param uploadId
 */
export const downloadFile = ({ configId, uploadId }) => {
  commFileUploadsConf_getFileUrl({ configId, uploadId }).then((json) => {
    const { data } = json;
    if (data.successful) {
      const res = data.resultValue;
      if (res.image) { // 图片下载
        downloadImage(data.resultValue.imagebyte, res.image);
      } else { // 文档下载
        window.location.href = res;
      }
    } else {
      Message.error(`下载失败：${data.resultHint}`);
    }
  });
};
export const getFileOss = ({ objectId }) => {
  // 文件流下载转换有问题，直接打开链接下载 env.NODE_ENV === 'local' ?  env.VUE_APP_BASE_API ? env.VUE_APP_BASE_API : 'http://10.232.238.73:15689' :
  let baseUrl = env.NODE_ENV === 'local' ? env.VUE_APP_BASE_API !== '/' ? env.VUE_APP_BASE_API : 'http://10.232.238.73:15689' : '';
  baseUrl = `${baseUrl}/api-hnxt-poi/commFileUploadDetails/getFileUrl?id=${objectId}`;
  return baseUrl;
};
/**
 * 下载文件 oss
 *
 * @param configId
 * @param uploadId
 */
export const downloadFileOss = ({ objectId }) => {
  if (env.NODE_ENV === 'local' && !env.VUE_APP_BASE_API) {
    Message.error('本地环境使用代理服务器，不支持下载');
  } else {
    // 文件流下载转换有问题，直接打开链接下载 env === 'local' ?  env.VUE_APP_BASE_API ? env.VUE_APP_BASE_API : 'http://10.232.238.73:15689' :
    let baseUrl = env.NODE_ENV === 'local' ? env.VUE_APP_BASE_API !== '/' ? env.VUE_APP_BASE_API : 'http://10.232.238.73:15689' : '';
    baseUrl = `${baseUrl}/api-hnxt-poi/commFileUploadDetails/getFileUrl?id=${objectId}`;
    const d = document.createElement('a');
    d.setAttribute('download', baseUrl);
    d.href = baseUrl;
    document.body.appendChild(d);
    d.click();
    document.body.removeChild(d);
  }
};
/**
 * 批量下载文件 oss
 *
 * @param configId
 * @param uploadId
 */
export const downloadFileBatchOss = ({ objectId }) => {
  if (env.NODE_ENV === 'local' && !env.VUE_APP_BASE_API) {
    Message.error('本地环境使用代理服务器，不支持下载');
  } else {
    // 文件流下载转换有问题，直接打开链接下载
    let baseUrl = env.NODE_ENV === 'local' ? env.VUE_APP_BASE_API !== '/' ? env.VUE_APP_BASE_API : 'http://10.232.238.73:15689' : '';
    baseUrl = `${baseUrl}/api-hnxt-poi/commFileUploadDetails/getFileUrls?ids=${objectId}`;
    const d = document.createElement('a');
    d.href = baseUrl;
    document.body.appendChild(d);
    d.click();
    document.body.removeChild(d);
  }
};

/**
 * 下载图片
 *
 * @param data
 * @param fileName
 */
export const downloadImage = (data, fileName) => {
  const blobSrc = `data:image/png;base64,${data}`;
  dataURIToBlob(blobSrc, fileName);
};

/**
 * 下载Csv
 *
 * @param data
 * @param fileName
 */
export const downloadCsv = (data, fileName, format) => {
  const blob = new Blob([data]);
  // , {type: 'application/vnd.ms-excel'}
  download(blob, fileName + format);
};
