module.exports = {
  entry: "./src/app.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.(eot|woff2?|ttf|svg)$/,
      loader: "file-loader"
    }]
  }
};
