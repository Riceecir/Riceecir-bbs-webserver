const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
const terserWebpackPlugin = require('terser-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    mode: 'production',

    optimization: {
        minimize: true,
        minimizer: [
            new terserWebpackPlugin({
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                }
            })
        ]
    }
})