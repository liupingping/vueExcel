const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production',
  publicPath: './',
  assetsDir: 'static',
  outputDir: resolve('dist'),
  pages: {
    index: {
      entry: 'src/main.js',
      title: '工具箱',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@a', resolve('src/assets'))
      .set('@v', resolve('src/views'));
  },
  devServer: {
    open: true,
    port: 8080,
    https: false,
    hotOnly: true,
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'index.html') },
      ],
    },
    // proxy: 'http://10.232.238.73:15689',
    // proxy: 'http://10.223.56.180'
    proxy: 'http://10.232.238.72:10526'
  },
};
