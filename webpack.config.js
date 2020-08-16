const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, 'index.ts'),
    output: {
        filename: 'cartManager.min.js',
        path: __dirname,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.scss$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader
                  },
                  {
                    // Interprets CSS
                    loader: "css-loader",
                    options: {
                      importLoaders: 2
                    }
                  },
                  {
                    loader: 'sass-loader' // 将 Sass 编译成 CSS
                  }
                ]
              }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", '.scss']
    },
    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'cartManager.min.css',
          allChunks: true,
        }),
      ],
};