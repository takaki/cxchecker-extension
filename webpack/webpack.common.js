module.exports = {
    mode: 'production',
    entry: "./popup.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {

                loader: "babel-loader",
                options: {
                    presets: ['react', 'env', 'es2015']
                }
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
}