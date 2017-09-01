var EOL = require('os').EOL,
    nameRegEx = /^[a-zA-Z_][a-zA-Z\d_]*$/;

function toObjectKey(str) {
    return nameRegEx.test(str) ? str : "'" + str + "'"
}

function toObjectValue(x) {
    return typeof x === 'boolean' ? x : "'" + x + "'";
}

module.exports = function ({ block, elem, mod={} }) {
    const { name : modName, val : modVal } = mod,
        entityName = elem || block;

    return `import React from 'react';
import ReactDom from 'react-dom';
import ${entityName} from 'b:${block}${elem? ' e:' + elem : ''}${modName? ' m:' + modName + (modVal? '=' + modVal : ''): ''}';

class App extends React.Component {
    render() {
        return <${entityName}${modName? ' ' + modName + (modVal? '="${modVal}"' : ''): ''}/>
    }
}
ReactDom.render(<App/>, document.getElementById('root'));
`;
};
