module.exports = {
    entry: './src/main.js',
    module: {
      rules: [
        {
          test:/\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                [
                  "@babel/plugin-transform-react-jsx",
                  {
                    // "throwIfNamespace": false, // defaults to true
                    // "runtime": "automatic", // defaults to classic
                    // "importSource": "custom-jsx-library", // defaults to react
                    pragma: 'createElement',
                  }
                ]
              ]
            }
          }
        }
      ]
    },
    mode: "development",
    optimization: {
      minimize: false,
    },
    plugins: [new (require('html-webpack-plugin'))],
    devServer: {
        open: true,
        compress: false,
        contentBase: "./src"
    }
  };