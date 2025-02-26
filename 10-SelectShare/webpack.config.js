const path = require('path');

module.exports = {
  entry: './src/app.ts', // Entry file (your TypeScript code)
  output: {
    filename: 'bundle.js', // Output bundled file
    path: path.resolve(__dirname, 'dist'), // Directory where the bundled file will be stored
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve these extensions
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader', // Use ts-loader for TypeScript files
        exclude: /node_modules/,
      },
    ],
  },
};
