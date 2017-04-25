import { declMod } from 'bem-react-core';

export default declMod({ mode : 'radio-check' }, {
    block : 'Menu',

    _onItemClick(e, val) {
        this.__base(...arguments);
        this.props.onChange(val === this.props.value? null : val);
    }
}, {
    propTypes : {
    },

    defaultProps : {
    }
});

