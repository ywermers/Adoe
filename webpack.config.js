var path=require('path');
var webpack=require('webpack');
var HTMLWebpackPlugin=require('html-webpack-plugin')
var HTMLWebpackPluginConfig= new HTMLWebpackPlugin({
    template:__dirname+'/reactApp/index.html',
    filename:'index.html',
    inject:'body'
})
module.exports= {
  entry: './reactApp/main.js',
  output: {
    path:path.resolve(__dirname,'public/build'),
    filename:'main.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader:'babel-loader',
        exclude: '/node_modules/',
        query: {
          presets: [ 'es2015','react']
        }
      }
    ]
  },
  stats: {
    colors:true
  },
  devtool:'source-map',
  plugins: [HTMLWebpackPluginConfig]

};
