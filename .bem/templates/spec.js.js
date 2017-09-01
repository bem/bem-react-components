var EOL = require('os').EOL,
    nameRegEx = /^[a-zA-Z_][a-zA-Z\d_]*$/;


function toObjectKey(str) {
    return nameRegEx.test(str) ? str : "'" + str + "'"
}

function toObjectValue(x) {
    return typeof x === 'boolean' ? x : "'" + x + "'";
}

module.exports = function ({ block, elem, mod={} }, naming) {
    const { name : modName, val : modVal } = mod;

    return `import React from 'react';
import { block } from '../../.jest/helpers';
import ${block} from 'b:${block}';

const renderer = block('${block}');

it('should be ...', () => {
    renderer(<${block}/>);
});
`;
};
