import { declMod } from 'bem-react-core';

export default declMod({ mode : 'check' }, {
    block : 'Menu',

    _onMenuItemClick(e, val) {
        this.__base(...arguments);

        const { onChange, value } = this.props,
            index = value.indexOf(val);

        // NOTE: optimize onChange call in case without changes
        onChange(~index?
            value.filter((_, i) => i !== index) :
            value.concat(val));
    }
}, {
    defaultProps : {
        value : []
    }
});
