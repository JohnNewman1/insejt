module.exports = {
    mode: 'production',
    entry: {
      popup: './src/popup.tsx',
    },
    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                ["@babel/plugin-transform-react-jsx", { "pragma":"h" }]
              ]
            }
          }
        }
      ]
    },
    resolve: {
      alias: {
        react: 'preact/compat',
        'react-dom': 'preact/compat',
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    }
  };