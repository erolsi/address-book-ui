const path = require('path');

module.exports = {
  webpack: {
    alias: {
      api: path.resolve(__dirname, 'src/api.ts')
    }
  },
  plugins: [
    {
      plugin: require('craco-antd'),
      options: {
        customizeTheme: {
          '@primary-color': '#0099ff'
        }
      }
    }
  ],
  babel: {
    loaderOptions: { presets: ['@emotion/babel-preset-css-prop'] }
  }
};
