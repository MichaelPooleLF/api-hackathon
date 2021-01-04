const path = require("path");

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "app.bundle.js"
  },
  devtool: "hidden-source-map",
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
  }
}
