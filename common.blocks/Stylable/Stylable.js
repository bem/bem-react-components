import { decl } from 'bem-react-core';

export default decl({
    block : 'Stylable',

    mods({ theme, size }) {
        const { defaults } = this.__self;
        return {
            theme : theme || defaults.theme,
            size : size || defaults.size
        };
    }
}, {
    defaults : {}
});
