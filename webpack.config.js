module.exports = {
	entry: './browser/main.jsx',
	output: {
		path: './browser/public/',
		filename: 'bundle.js'
	},
	devServer: {
		inline: true,
		port: 7777
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.scss$/,
			loaders: ['style-loader', 'css-loader','sass-loader']
		}, {
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
		}, {
			test: /\.(png|svg)$/,
			loaders: ['url-loader']
		}]
	}
}
