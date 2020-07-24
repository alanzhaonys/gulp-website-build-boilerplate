const path = require('path');
const distDir = path.resolve(__dirname, 'dist/js');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        path: distDir,
        filename: 'scripts.min.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
              presets: ["@babel/preset-env"],
            },
        }]
   }
};
