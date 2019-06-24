const path = require('path')
module.exports = {
    entry: './src/main.ts',
    mode: 'development',
    watch:true,
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'main.js'
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
    }
}