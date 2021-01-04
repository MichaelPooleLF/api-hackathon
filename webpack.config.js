const path = require("path");

const entryPath = path.join(__dirname, "src/main.js");
const outputPath = path.join(__dirname, "server/public/");

module.exports = {
  entry: {
    app: entryPath
  },
  output: {
    path: outputPath,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: outputPath,
    historyApiFallback: true,
    host: "0.0.0.0",
    port: "3000",
    proxy: {
      '/api': `http://localhost:3000`
    },
    stats: "minimal",
    watchContentBase: true
  }
}
