module.exports = {
    root : true,
    levels : {
        blocks : {
            scheme : 'nested',
            schemeOptions : 'react',
            naming : 'react'
        },
        'blocks/**/*.tests' : {
            scheme : 'flat',
            schemeOptions : 'react',
            naming : 'react'
        }
    },
    modules : {
        'bem-tools' : {
            plugins : {
                create : {
                    techs : ['js', 'spec.js', 'css', 'tests' ],
                    templates : {
                        js : '.bem/templates/js.js',
                        'spec.js' : '.bem/templates/spec.js.js',
                        'tests' : '.bem/templates/tests.js',
                    },
                    levels : {
                        blocks : { default : true },
                        'blocks*/**/*.tests' : {
                            techs : ['js', 'css', 'html'],
                            templates : {
                                js : '.bem/templates/tests-js.js',
                                css : '.bem/templates/tests-css.js',
                                html : '.bem/templates/tests-html.js',
                            }
                        }
                    }
                }
            }
        }
    }
};
