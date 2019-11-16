const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    watch: true,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
    },
    plugins: [
        new CopyPlugin([
            'src/index.html',
            'res/*.jpg'
        ])
    ]
}
module.exports = [server, viewer]