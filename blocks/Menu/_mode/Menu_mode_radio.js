import { declMod } from 'bem-react-core';

export default declMod({ mode : 'radio' }, {
    block : 'Menu',

    _onItemClick(e, val) {
        this.__base(...arguments);
        this.props.onChange(val);
    }
}, {
    propTypes : {
    },

    defaultProps : {
    }
});

