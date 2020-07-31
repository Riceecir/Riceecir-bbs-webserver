const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const resolve = p => {
  return path.join(__dirname, '../', p)
}

module.exports = {
  target: 'node',

  entry: {
    main: resolve('src/main.js')
  },

  output: {
    filename: '[name]-[hash].js',
    path: resolve('dist')
  },
  
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: resolve('node_modules')
      }
    ]
  },

  externals: [
    new nodeExternals()
  ],

  plugins: [
    new CleanWebpackPlugin()
  ]
}