import { decl } from 'bem-react-core';

export default decl({
    block : 'Select',
    elem : 'Control',

    tag : 'input',

    attrs({ value, name, disabled }) {
        return {
            name,
            value,
            disabled,
            type : 'hidden',
            autoComplete : 'off'
        };
    }
});
