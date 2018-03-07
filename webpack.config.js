const path = require('path'),
    glob = require('glob');

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
        pathinfo : true,
        path : `${__dirname}/tests/`,
        publicPath : '/tests',
        filename : '[name]'
    },
    devtool : 'inline-source-map',
    module : {
        rules : [
            {
                test : /\.html$/,
                use : [
                    'file-loader?name=[1]/[name].[ext]&regExp=([a-zA-Z]+)\.tests[\\\\/](.*)\.html$'
                ]
            },
            {
                test : /\.js$/,
                exclude : /node_modules\/react(-dom)?/,
                use : [{
                    loader : 'webpack-bem-loader',
                    options : {
                        techs : ['js', 'css']
                    }
                }, 'babel-loader']
            },
            {
                test : /\.css$/,
                use : ['style-loader', 'css-loader']
            }
        ]
    },
    resolve : {
        alias : {
            'react' : require.resolve('react/dist/react'),
            'react-dom' : require.resolve('react-dom/dist/react-dom')
        }
    }
};
