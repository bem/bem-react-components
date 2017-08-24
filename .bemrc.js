module.exports = {
    root : true,
    levels : {
        blocks : {
            scheme : 'nested',
            schemeOptions : 'react',
            naming : 'react'
        }
    },
    modules : {
        'bem-tools' : {
            plugins : {
                create : {
                    levels : {
                        blocks : {
                            default : true
                        }
                    },
                    techs : ['js', 'css'],
                    templates : {
                        js : '.bem/templates/js.js'
                    }
                }
            }
        }
    }
};
