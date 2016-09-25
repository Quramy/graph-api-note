"use strict";

const path = require("path");

module.exports = {
  resolve: {
    extensions: ["", ".js", ".jsx"],
  },
  entry: {
    bundle: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "babel"}
    ]
  }
};
