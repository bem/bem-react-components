import { declMod } from 'bem-react-core';

export default declMod({ mode : 'radio' }, {
    block : 'Menu',

    _onMenuItemClick(e, val) {
        this.__base(...arguments);
        this.props.onChange(val);
    }
});

