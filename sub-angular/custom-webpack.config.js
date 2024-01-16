const appName = require('./package.json').name;
module.exports = {
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  experiments: {
    topLevelAwait: true
  },
  output: {
    library: `${appName}-[name]`,
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${appName}`,
  },
};
