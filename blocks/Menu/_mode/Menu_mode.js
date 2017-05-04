import { declMod } from 'bem-react-core';
import PropTypes from 'prop-types';

export default declMod({ mode : '*' }, {
    block : 'Menu',

    willInit() {
        this.__base(...arguments);
        this._onMenuItemClick = this._onMenuItemClick.bind(this);
    },

    getChildContext() {
        return {
            _menuValue : this.props.value,
            _menuMode : this.props.mode,
            _onMenuItemClick : this._onMenuItemClick
        };
    },

    _onMenuItemClick(e, val) {}
}, {
    propTypes : {
        value: PropTypes.any,
        onChange : PropTypes.func
    },

    defaultProps : {
        onChange() {}
    },

    childContextTypes : {
        _menuValue : PropTypes.any,
        _menuMode : PropTypes.string,
        _onMenuItemClick : PropTypes.func
    }
});
