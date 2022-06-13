<template>
  <div>
    <div style="margin-top: 60px">
      <p>1.选择语言,点击按钮导出xlsx文档：</p>
    </div>
    <van-radio-group style="margin-top: 30px" v-model="radio" direction="horizontal">
      <van-radio name="0">简体中文</van-radio>
      <van-radio name="1">英文</van-radio>
    </van-radio-group>

    <!-- <van-button round block type="primary" size="normal" @click="handleExport('1')" style="margin-top: 20px">导出xlsx
    </van-button> -->

    <div style="margin-top: 70px">
      <p>2.下面为导出国家区号文件专用：</p>
    </div>
    <van-button round block type="primary" size="normal" @click="exportCountry()" style="margin-top: 20px">导出国家区号
    </van-button>

    <div style="margin-top: 70px">
      <p>3.下面为导出JSON文件专用(提交.xls文件)：</p>
    </div>
    <input style="margin-top: 20px" type="file" ref="upload" accept=".xls,.xlsx" />

    <div style="margin-top: 70px">
      <p>4.下面为导出EXcel文件专用(提交.Json文件)：</p>
    </div>
    <input style="margin-top: 20px" type="file" ref="uploadJson" accept=".json" />

  </div>
</template>

<script>
import { exportJson2Excel } from "@/utils/xlsx";
import XLSX from "xlsx";
import { saveAs } from "file-saver";

import zh from "@/data/zh.js";
import en from "@/data/en.js";

import country from "@/data/country.js";

export default {
  data() {
    return {
      radio: "0",

      outputs: [],

      langInfo: [
        { type: zh, id: "0", name: "简体中文" },
        { type: en, id: "1", name: "英文" },
      ],
    };
  },

  mounted() {
    this.$refs.upload.addEventListener("change", (e) => {
      //绑定监听表格导入事件
      this.readExcel(e);
    });

    this.$refs.uploadJson.addEventListener("change", (e) => {
      //绑定监听表格导入事件
      this.readJson(e);
    });
  },

  methods: {
    getLanDataByID(id) {
      let curType = zh;
      this.langInfo.forEach((element) => {
        if (element.id == id) {
          curType = element.type;
        }
      });
      return curType;
    },

    exportCountry() {
      let columns = [
        { title: "国家名", key: "key1" },
        { title: "号码", key: "key2" },
        { title: "国家", key: "key3" },
      ];
      let dataList = [];
      var langInfo = country;
      langInfo.forEach((prop1) => {
        var tempObj = { key1: "", key2: "", key3: "" };
        tempObj.key3 = prop1.name;
        tempObj.key2 = prop1.number;
        tempObj.key1 = prop1.countryName;
        dataList.push(tempObj);
      });
      exportJson2Excel(
        columns.map((n) => n.title),
        columns.map((n) => n.key),
        dataList,
        "国家区号"
      );
    },

    readJson(e) {
      //表格导入
      var that = this;
      let files = e.target.files;
      if (files.length <= 0) {
        //如果没有文件名
        console.log("没有文件名");
        return false;
      } else if (!/\.(json)$/.test(files[0].name.toLowerCase())) {
        console.log("上传格式不正确，请上传json格式");
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          let columns = [
            { title: "模块", key: "key1" },
            { title: "字段", key: "key2" },
            { title: "字段值", key: "key3" },
          ];
          const data = JSON.parse(ev.target.result);
          let dataList = [];
          var langInfo = data;
          Object.keys(langInfo).forEach((prop1) => {
            var orgInfo = langInfo[prop1];
            Object.keys(orgInfo).forEach((prop2) => {
              var tempObj = { key1: "", key2: "", key3: "" };
              tempObj.key3 = orgInfo[prop2];
              tempObj.key2 = prop2;
              tempObj.key1 = prop1;
              dataList.push(tempObj);
            });
          });
          exportJson2Excel(
            columns.map((n) => n.title),
            columns.map((n) => n.key),
            dataList,
            langInfo.language.name
          );
          this.$refs.uploadJson.value = "";
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsText(files[0]);
    },

    readExcel(e) {
      //表格导入
      var that = this;
      const files = e.target.files;
      if (files.length <= 0) {
        //如果没有文件名
        console.log("没有文件名");
        return false;
      } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
        console.log("上传格式不正确，请上传xls或者xlsx格式");
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          const wsname = workbook.SheetNames[0]; //取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
          console.log(ws);
          that.outputs = {}; //清空接收数据
          var fileName = "en.json";
          for (var i = 0; i < ws.length; i++) {
            var tempObj = ws[i];
            var key1 = tempObj.模块;
            var key2 = tempObj.字段;
            var key3 = tempObj.字段值;
            if (!that.outputs[key1]) {
              that.outputs[key1] = {};
            }
            that.outputs[key1][key2] = key3;

            if (key1 == "language" && key2 == "fname") {
              fileName = key3 + ".json";
            }
          }
          console.log("outputs:" + JSON.stringify(that.outputs));
          var blob = new Blob([JSON.stringify(that.outputs)], {
            type: "text/plain;charset=utf-8",
          });
          saveAs(blob, fileName);
          this.$refs.upload.value = "";
        } catch (e) {
          return false;
        }
      };
      fileReader.readAsBinaryString(files[0]);
    },

    handleExport(type) {
      let columns = [
        { title: "模块", key: "key1" },
        { title: "字段", key: "key2" },
        { title: "字段值", key: "key3" },
      ];
      let dataList = [];
      var langInfo = this.getLanDataByID(this.radio);
      Object.keys(langInfo).forEach((prop1) => {
        var orgInfo = langInfo[prop1];
        Object.keys(orgInfo).forEach((prop2) => {
          var tempObj = { key1: "", key2: "", key3: "" };
          tempObj.key3 = orgInfo[prop2];
          tempObj.key2 = prop2;
          tempObj.key1 = prop1;
          dataList.push(tempObj);
        });
      });
      exportJson2Excel(
        columns.map((n) => n.title),
        columns.map((n) => n.key),
        dataList,
        langInfo.language.name
      );
    },
  },
};
</script>



<style>
.container {
  border: none;
  border-radius: 4px;
  background-color: #409eff;
  height: 40px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
  min-width: 80px;
  *zoom: 1;
}

.upload_file {
  font-size: 20px;
  opacity: 0;
  position: absolute;
  filter: alpha(opacity=0);
  width: 60px;
}
</style>
