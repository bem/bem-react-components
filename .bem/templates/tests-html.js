var EOL = require('os').EOL,
    nameRegEx = /^[a-zA-Z_][a-zA-Z\d_]*$/;


function toObjectKey(str) {
    return nameRegEx.test(str) ? str : "'" + str + "'"
}

function toObjectValue(x) {
    return typeof x === 'boolean' ? x : "'" + x + "'";
}

module.exports = function (entity, naming) {
    return [
        "import {decl} from 'bem-react-core';",
        "",
        "export default " +
        (entity.modName ?
            "declMod({ " +
                toObjectKey(entity.modName) + " : " +
                toObjectValue(entity.modVal || true) +
            " }, {" :
            "decl({"),
        "    block : '" + entity.block + "'" +
        (entity.elem ?
            "," + EOL + "    elem : '" + entity.elem + "'" :
            ""),
        "});"
    ].join(EOL);
};
