module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    // 文件可以使用&继承
    'postcss-nested': {},
    'postcss-mixins': {},
    autoprefixer: {},
    'postcss-preset-env': {
      stage: 1,
    },
  },
};
