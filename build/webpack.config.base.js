const path = require('path')
const NodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const resolve = p => {
  return path.join(__dirname, '..', p)
}

module.exports = {
  target: 'node',

  entry: {
    main: resolve('src/main.js')
  },

  output: {
    filename: '[name].js',
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
  resolve: {
    alias: {
      '@': resolve('src')
    }
  },

  externals: [
    new NodeExternals()
  ],

  plugins: [
    new CleanWebpackPlugin()
  ],

  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true,
    path: true
  }
}
