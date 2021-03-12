const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
module.exports = (env) => {
  return {
    entry: './src/index.tsx',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    devtool: env.TIPO === 'local' ? 'source-map' : false,
    devServer: {
      // contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.tsx$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
    mode: env.TIPO === 'local' ? 'development' : 'production',
    plugins: [
      new webpack.DefinePlugin({
        __BACKEND_URL__: JSON.stringify(
          env.TIPO === 'local' ? 'http://localhost:80/' : 'https://backendeducorp.herokuapp.com/',
        ),
        __FRONTEND_PUBLICO_URL__: JSON.stringify(
          env.TIPO === 'local' ? 'http://localhost:9000/' : 'https://colegiosnewton.com/',
        ),
      }),
      new HtmlWebPackPlugin({
        template: './src/Public/index.html',
        hash: true,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/Images'),
            to: path.resolve(__dirname, 'dist/Images'),
          },
          {
            from: path.resolve(__dirname, 'src/Public'),
            to: path.resolve(__dirname, 'dist/Public'),
          },
        ],
      }),
      // new InjectManifest({
      //   swSrc: "./src-sw.js",
      //   swDest: "sw.js",
      // }),
    ],
    resolve: {
      extensions: ['.tsx', '.js', '.json'],
    },
  }
}
