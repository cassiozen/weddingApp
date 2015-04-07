module.exports = {
  entry:{
    App: './src/App.js'
  },
  output: {
    path: 'www',
    filename: '[name].js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' },
      { test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.eot$|\.wav$|\.mp3$/, loader: "file" },
      { test: /\.less$/, loader: "style!css!less"}
    ]
  }
}
