const path = require('path')
const { ContextReplacementPlugin } = require('webpack')

module.exports = {
    mode: 'development', // TODO: make dynamic
    entry: ['@babel/polyfill', './src/index.ts'],
    target: 'node',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
        ],
    },
    plugins: [new ContextReplacementPlugin(/require_optional/)],
    resolve: {
        extensions: ['.ts', 'tsx', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        chunkFilename: '[chunkhash].js',
    },
}
