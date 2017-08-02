const path = require('path')
const webpack = require('webpack')

const config = {
	entry: ['./src/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist/'
	},
	devtool:
		process.env.NODE_ENV === 'development' ? 'cheap-eval-source-map' : false,
	devServer: {
		hot: false,
		publicPath: '/dist/',
		historyApiFallback: false
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json']
	},
	stats: {
		assets: true,
		chunks: true,
		chunkModules: true,
		colors: true,
		reasons: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	],
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				options: {
					presets: ['env']
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|svg|gif|jpg|bmp|jpeg)$/,
				use: ['file-loader']
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}
		]
	}
}

module.exports = config
