import { declMod } from 'bem-react-core';

export default declMod({ mode : 'check' }, {
    block : 'Menu',

    _onItemClick(e, val) {
        this.__base(...arguments);
        const index = this.props.value.indexOf(val);
        ~index ?
            this.props.onChange(remove(this.props.value, index)) :
            this.props.onChange(this.props.value.concat(val));
    }
}, {
    propTypes : {
        // value: PropTypes.array()
    },

    defaultProps : {
    }
});


function remove(arr, index) {
    const res = [].concat(arr);
    res.splice(index, 1);
    return res;
}
