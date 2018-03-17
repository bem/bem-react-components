module.exports = {
    root : true,
    levels : {
        'common.blocks' : {
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
                        'common.blocks' : {
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
