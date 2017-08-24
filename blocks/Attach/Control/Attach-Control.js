import { decl } from 'bem-react-core';

export default decl({
    block : 'Attach',
    elem : 'Control',

    tag : 'input',

    attrs({ onChange }) {
        return {
            type : 'file',
            onChange
        };
    }
});
