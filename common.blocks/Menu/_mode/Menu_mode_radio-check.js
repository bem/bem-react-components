import { declMod } from 'bem-react-core';

export default declMod({ mode : 'radio-check' }, {
    block : 'Menu',

    _onMenuItemClick(e, val) {
        this.__base(...arguments);
        this.props.onChange(val === this.props.value? undefined : val);
    }
});

