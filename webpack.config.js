var path = require('path'),
    glob = require('glob'),
    bemLoader = require.resolve('bem-react-core/webpack/bem-loader');

var jsLoaders = [bemLoader, 'babel'];

module.exports = {
    entry : glob.sync('blocks/**/*.tests/*.html').reduce((res, file) => {
        const basename = path.basename(file, '.html'),
            entity = path.basename(path.dirname(file), '.tests');
        res[`${entity}/${basename}.js`] = [
            `${__dirname}/${file.replace(/\.html$/, '.js')}`,
            `${__dirname}/${file}`
        ];
        return res;
    }, {}),
    output : {
        path : `${__dirname}/tests/`,
        publicPath : `/tests`,
        filename : '[name]',
    },
    module : {
        loaders : [
            {
                test : /\.html$/,
                loader : 'file?name=[1]/[name].[ext]&regExp=([a-zA-Z]+)\.tests/.*\.html$',
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
