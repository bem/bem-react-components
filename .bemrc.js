module.exports = {
    root : true,
    levels : {
        blocks : {
            scheme : 'nested',
            schemeOptions : 'react',
            naming : 'react'
        },
        'blocks/**/*.tests' : {
            scheme : 'flat'
        }
    },
    modules : {
        'bem-tools' : {
            plugins : {
                create : {
                    templates : {
                        js : '.bem/templates/js.js',
                        'spec.js' : '.bem/templates/spec.js.js',
                        'tests' : '.bem/templates/tests.js',
                    },
                    levels : {
                        blocks : {
                            default : true,
                            techs : ['js', 'css']
                        },
                        'blocks/**/*.tests' : {
                            techs : ['js', 'html'],
                            templates : {
                                js : '.bem/templates/tests-js.js',
                                html : '.bem/templates/tests-html.js',
                            }
                        }
                    }
                }
            }
        }
    }
};
