### 运行命令
```
npm install // 若无nodemodules安装项目
npm run dev // 开发环境
npm run test // 测试环境
npm run build // 生产环境
```

npm install xlsx@0.16.0 --save


### 目录结构
```
|- vue.config.js //
|- dist // 打包生成文件
|- public // 用来
|- src
|-- main.js // 入口主文件
|-- App.vue // 入口 模版
|-- api // 接口 目录
|-- assets // 静态资源目录，css images fonts
|-- components // 组件目录
|-- mock // mock 假数据目录
|-- utils // 公共基础js插件苦
|-- views // 页面路由文件，主要是针对 路由页面
|-- router // 路由
|--- index.js // 路由配置文件，生成路由，拦截导航
|--- lazyLoading.js // 页面懒加载插件
|--- routers.js // 静态路由配置
|-- store // vuex 缓存
|--- index.js // 缓存主配置定义
|--- modules // 缓存各个模型
|---- user.js // 用户模型
|---- app.js // 应用模型
|---- chartsColors // echarts 图表 配色
|- api.js // node 执行命令拉取 swagger 接口
|- nodemodules.zip // 依赖库 需要解压 后才能运行命令
```