const path = require('path');

const library = 'Jamstik';
const libraryExport = 'default';

const config = {
    entry: './src/index.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    devtool: 'eval',
    devServer: {
        compress: true,
        port: 9000
    }
};

const exportLibraryTarget = libraryTarget => 
    Object.assign({}, config, {
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `${library.toLowerCase()}.${libraryTarget}.js`,
            library,
            libraryTarget,
            libraryExport
        }
    });

module.exports = [
    exportLibraryTarget('umd'),
    exportLibraryTarget('var'),
];