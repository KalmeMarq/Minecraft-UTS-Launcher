const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

let rendererConfig = {
  entry: path.resolve(__dirname, '../../src/renderer/index.tsx'),
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
/*       {
        test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'assets',
              outputPath: process.env.NODE_ENV === 'development' ? 'assets' : 'dist/assets',
            }
          }
        ]
      }, */
      {
        test: /\.tsx?$/,
        exclude:/(node_modules|\.webpack)/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: 'assets',
              outputPath: 'development' ? 'assets' : 'dist/assets',
            },
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      '@assets': path.resolve(__dirname, "../../assets/"),
    }
  },
  node: {
		__dirname: process.env.NODE_ENV !== 'production',
		__filename: process.env.NODE_ENV !== 'production',
	},
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: 'renderer.js',
    publicPath: '/',
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/web/index.html',
      hash: true,
      minify: false
    }),
    new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
  ],
  target: 'electron-renderer'
}

if(process.env.NODE_ENV !== 'production') {
	rendererConfig.plugins.push(
		new webpack.DefinePlugin({
			__static: `"${path
				.join(__dirname, '../../assets')
				.replace(/\\/g, '\\\\')}"`,
		})
	)
}

if(process.env.NODE_ENV === 'production') {
	rendererConfig.plugins.push(
		new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../../assets'),
          to: path.join(__dirname, '../../dist/assets')
        }
      ]
    }),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
		})
	)
}

module.exports = rendererConfig