import { decl } from 'bem-react-core';

export default decl({
    block : 'TextInput',
    elem : 'Clear',

    tag : 'i',

    attrs({ onClick }) {
        return { onClick };
    },

    mods({ visible }) {
        return { visible };
    }
});
