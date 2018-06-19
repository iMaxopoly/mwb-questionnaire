/* eslint-disable no-undef */
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "production",

  entry: {
    index: ["babel-polyfill", "./src/index.js"]
  },

  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.html$/,
        use: [
          { loader: "file-loader", options: { name: "[name].html" } },
          "extract-loader",
          { loader: "html-loader", options: { minimize: true } }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { minimize: true } },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [require("autoprefixer")(), require("cssnano")()]
            }
          },
          "sass-loader"
        ]
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({ filename: "[name]-[contenthash].css" }),
    new UglifyJsWebpackPlugin({
      cache: true,
      parallel: true
    })
  ]
};
