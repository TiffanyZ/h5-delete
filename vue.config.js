const path = require('path');
const webpack = require('webpack');
console.log('hhh')

const resolve = (dir) => {
  return path.join(__dirname, './', dir);
};
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const {formatDate} = require('./src/common');
console.log(process.env.NODE_ENV)


module.exports = {
  publicPath: './', // 基本路径,打包时加上.
  // publicPath: process.env.NODE_ENV === 'production' ? '/site/vue-demo/' : '/',  // 公共路径
  indexPath: 'index.html' , // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  // px转rem的配置（postcss-plugin-px2rem插件）
  lintOnSave: true,
  runtimeCompiler: false,
  productionSourceMap: false, // 不需要生产环境的设置false可以减小dist文件大小，加速构建
  css: {
    loaderOptions: {}
  },
  configureWebpack: () => ({
    name: 'vue-cli3-template',
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@less': resolve('src/assets/less'),
        '@js': resolve('src/assets/js'),
        '@images': resolve('src/assets/img'),
        '@components': resolve('src/components'),
        '@filters': resolve('src/filters'),
        '@views': resolve('src/views'),
        '@common': resolve('src/common'),
        '@directives': resolve('src/directives'),

        // 文件别名
        'services': resolve('src/services'),
        'variable': resolve('src/assets/less/variable.less'),
        'mixins': resolve('src/assets/less/magicless/magicless.less')
      }
    },
    plugins: genPlugins()
  }),
}
const genPlugins = () => {
  const plugins = [
    // 为静态资源文件添加 hash，防止缓存
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, './public/index.html'),
      hash: true
    }),
    // bannerPlugin
    new webpack.BannerPlugin({
      banner: 'Build time ' + formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')
    })
  ];

  return plugins;
};
