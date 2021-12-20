const path = require('path'),
    settings = require('./settings');

module.exports = {
    entry: {
        App: settings.themeLocation + "js/admin/scripts.js"
    },
    output: {
        path: path.resolve(__dirname, settings.themeLocation + "js/admin"),
        filename: "scripts-bundled.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    mode: 'development'
}