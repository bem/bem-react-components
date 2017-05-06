import { declMod } from 'bem-react-core';
import PropTypes from 'prop-types';

export default declMod(props => props.hasOwnProperty('value'), {
    block : 'Menu',
    elem : 'Item',

    willInit() {
        this.__base(...arguments);
        this._onClick = this._onClick.bind(this);
    },

    mods({ value }) {
        const menuValue = this.context._menuValue;
        return {
            ...this.__base(...arguments),
            checked : Array.isArray(menuValue)?
                menuValue.indexOf(value) > -1 :
                menuValue === value
        }
    },

    attrs({ disabled }) {
        return {
            ...this.__base(...arguments),
            onClick : !disabled && this._onClick
        };
    },

    _onClick(e) {
        this.context._onMenuItemClick(e, this.props.value);
    }
}, {
    contextTypes : {
        _menuValue : PropTypes.any,
        _onMenuItemClick : PropTypes.func
    }
});
