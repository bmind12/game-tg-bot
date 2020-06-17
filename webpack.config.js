const path = require('path')
const { ContextReplacementPlugin } = require('webpack')

module.exports = (env) => {
    const plugins = [new ContextReplacementPlugin(/require_optional/)]

    return {
        mode: env.mode,
        entry: './src/index.ts',
        target: 'node',
        devtool: !env.production && 'inline-source-map',
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
            ],
        },
        plugins,
        resolve: {
            extensions: ['.ts', 'tsx', '.js'],
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].js',
        },
    }
}
