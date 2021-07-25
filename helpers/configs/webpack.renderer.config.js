const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    'style-loader',
   /*  process.env.NODE_ENV === 'production' && {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: path.resolve('../../')
      }
    }, */
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [
           require('postcss-flexbugs-fixes'),
            [
              require('postcss-preset-env'),
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
           
            postcssNormalize(),
          ],
        },
        sourceMap: false,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: true,
          root: path.resolve(__dirname, '../../src/renderer'),
        },
      },
      {
        loader: preProcessor,
        options: {
          sourceMap: true,
        },
      }
    );
  }
  return loaders;
};

let rendererConfig = {
  entry: path.resolve(__dirname, '../../src/renderer/index.tsx'),
  module: {
    rules: [
   /*    {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }, */
      {
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            }
          },
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: getStyleLoaders({
              importLoaders: 1,
              sourceMap: true,
              modules: {
                compileType: 'icss',
              },
            }),
            sideEffects: true,
          },
          {
            test: /\.(scss|sass)$/,
            exclude: /\.module\.(scss|sass)$/,
            use: getStyleLoaders({
              importLoaders: 3,
              sourceMap: true,
              modules: {
                compileType: 'icss',
              },},
              'sass-loader'
            ),
            sideEffects: true,
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
          },
          {
            loader: 'file-loader',
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]'
            }
          }
        ]
      },
     /*  {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ],
      }, */
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
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
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
    new HtmlWebpackPlugin(Object.assign(
      {
        template: 'src/web/index.html',
        inject: true
      },
      process.env.NODE_ENV === 'production' && { minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }}
    )),
    new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),

  ],
  target: 'electron-renderer'
}

if(process.env.NODE_ENV !== 'production') {
	rendererConfig.plugins.push(
		new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
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