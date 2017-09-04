import { decl } from 'bem-react-core';

export default decl({
    block : 'Stylable',

    mods({ theme, size }) {
        console.log('Stylable mods');
        const defaults = this.__self.getDefaults();
        return {
            ...this.__base(...arguments),
            theme : theme || defaults.theme,
            size : size || defaults.size
        };
    }
}, {
    getDefaults() {
        return {};
    }
});
