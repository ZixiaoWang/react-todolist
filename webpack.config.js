const path = require('path');

module.exports = {
    entry: [
        './src/css.js',
        './src/main.tsx'
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            { 
                test: /.css$/, 
                use: [
                    'style-loader', 
                    'css-loader'
                ] 
            },
            { 
                test: /.tsx?$/, 
                use: 'ts-loader', 
                exclude: /node_modules/ 
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    }
}