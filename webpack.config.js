module.exports = {
  entry: "./popup.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/,  loader: "babel-loader" , exclude: /node_modules/ }
    ]
  },
}
