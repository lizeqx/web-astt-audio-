const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      // Define your loaders for handling different file types
      {
        test: /\.js$/, // Apply the loader to JavaScript files
        exclude: /node_modules/, // Exclude the 'node_modules' directory from the loader
        use: {
          loader: 'babel-loader', // Use the Babel loader for JavaScript files
          options: {
            presets: ['@babel/preset-env'], // Specify the Babel presets for transpiling JavaScript
          },
        },
      },
      {
        test: /\.css$/, // Apply the loader to CSS files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader to handle CSS files
      },
      // Add additional loaders and configurations as needed for other file types
    ],
  },
  // Define any additional plugins or configurations as needed
  plugins: [
    // HtmlWebpackPlugin configuration for generating HTML files
    new HtmlWebpackPlugin({
      template: './src/index.html', // Specify the path to your HTML template file
      filename: 'index.html', // Output filename for the generated HTML file
    }),
    // Add any other plugins you require for your project
  ],
}  
