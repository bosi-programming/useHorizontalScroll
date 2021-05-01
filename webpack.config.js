const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: { 
      type: "module",
    },
    globalObject: "this",
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  externals: {
    react: 'commonjs react',
   'react-dom': 'commonjs react-dom',
 },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "awesome-typescript-loader",
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        exclude: path.join(__dirname, '/node_modules/'),
        loader: 'babel-loader',
      }
    ]
  },
  experiments: {
    outputModule: true,
  },
};
