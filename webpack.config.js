var bemLoader = require.resolve('bem-react-core/webpack/bem-loader');

var jsLoaders = [bemLoader, 'babel'];

module.exports = {
    entry : {
        'TextInput' : [
            `${__dirname}/blocks/TextInput/TextInput.tests/simple.js`,
            `${__dirname}/blocks/TextInput/TextInput.tests/simple.html`
        ]
    },
    output : {
        path : `${__dirname}/tests/`,
        publicPath : `/tests`,
        filename : '[name]',
    },
    module : {
        loaders : [
            {
                test : /\.html$/,
                loader : 'file?name=[1][name].[ext]&regExp=([a-zA-Z]+)\.tests/.*\.html',
            },
            {
                test : /\.js$/,
                loaders : jsLoaders
            },
            {
                test : /\.css$/,
                loaders : ['style', 'css']
            }
        ]
    },
    devtool : 'inline-source-map',
    bemLoader : {
        techs : ['js', 'css'], // NOTE: order is very important! JS first!!
        levels : [
            `${__dirname}/blocks`
        ]
    }
};
