/* eslint-disable better/no-new */
const path = require("path")
const webpack = require("webpack")
const CleanWebpackPlugin = require("clean-webpack-plugin")

const baseConfig = {
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, "../application/components")],
        use: [
          {
            loader: "to-string-loader",
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              minimize: true,
              discardComments: {removeAll: true},
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, "../application"),
        enforce: "pre",
        use: "source-map-loader",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
      },
      {test: /\.json$/, loader: "json-loader"},
    ],
  },
  node: {
    fs: "empty",
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: false,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
      sourceMap: true,
      warningsFilter: () => false,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "common",
      filename: "common.[hash]",
      minChunks: Infinity,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(path.resolve(__dirname, "..", "dist"), {
      root: "/",
      verbose: false,
    }),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "..", "application/components"),
      constants: path.resolve(__dirname, "..", "application/constants"),
      utils: path.resolve(__dirname, "..", "application/utils"),
    },
  },
}

const componentsPath = path.resolve(__dirname, "..", "application/components")
const componentsDistPath = path.resolve(__dirname, "..", "dist")

const bundlesConfig = Object.assign({}, baseConfig, {
  entry: {
    signup: `${componentsPath}/signup/signup.js`,
  },
  output: {
    filename: "[name].[hash].js",
    path: componentsDistPath,
  },
})

module.exports = bundlesConfig
