const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const reactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'), //atributo que aponta para arquivo principal do projeto
  output: {
    path: path.resolve(__dirname, 'dist'), // gerando saida do webpack
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'] //extensoes que o webpack esta apto a interpretar
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    hot: true
  },
  plugins: [
    isDevelopment && new reactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(j|t)sx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  }
}