var path = require('path');

var PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  entry: PATHS.app,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
	resolve: {
    extensions: ['', '.js', '.jsx']
  },
	module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: PATHS.app,
        query: {
          presets: ['react', 'es2015'],
          plugins: ["syntax-object-rest-spread", "transform-object-rest-spread"]
        }
      }
    ]
  }
};
