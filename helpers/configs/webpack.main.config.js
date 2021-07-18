const path = require('path')
const webpack = require('webpack')

let mainConfig = {
  entry: path.resolve(__dirname, '../../src/main/index.ts'),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ],
      },
      {
        test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'assets',
              outputPath: process.env.NODE_ENV == 'development' ? 'assets' : '../../dist/assets',
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude:/(node_modules|\.webpack)/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    alias: {
      '@assets': path.resolve(__dirname, '../../assets')
    }
  },
  node: {
    __dirname: process.env.NODE_ENV !== 'production',
    __filename: process.env.NODE_ENV !== 'production'
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'main.js'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  target: 'electron-main'
}

if(process.env.NODE_ENV !== 'production') {
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      '__static': `"${path.join(__dirname, '../../assets').replace(/\\/g, '\\\\')}"`
    })
  )
}

if(process.env.NODE_ENV === 'production') {
  mainConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  )
}

module.exports = mainConfig