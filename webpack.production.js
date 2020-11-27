const path = require("path");
const distDir = path.resolve(__dirname, "dist/js");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  mode: "production",
  output: {
    path: distDir,
    filename: "scripts.min.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/preset-env"],
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        cache: true,
        parallel: true,
        sourceMap: true,
        // Extract comments into a separate file
        extractComments: true,
        uglifyOptions: {
          mangle: true,
          ouput: {
            comments: false,
          },
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
};
