var bemLoader = require.resolve('bem-react-core/webpack/bem-loader');

var jsLoaders = [bemLoader, 'babel'];

module.exports = {
    entry : {
        js : `${__dirname}/blocks/TextInput/TextInput.tests/simple.js`,
        html : `${__dirname}/blocks/TextInput/TextInput.tests/simple.html`
    },
    output : {
        path : `${__dirname}/tests/TextInput/`,
        publicPath : `/tests/TextInput/`,
        filename : '_simple.js'
    },
    module : {
        loaders : [
            {
                test : /\.html$/,
                loader : 'file?name=[name].[ext]',
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
