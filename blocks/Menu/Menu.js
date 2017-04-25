import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';

export default decl({
    block : 'Menu',
    willInit() {
        this._onItemClick = this._onItemClick.bind(this);
    },

    getChildContext() {
        return { menuValue : this.props.value, _onItemClick : this._onItemClick };
    },

    _onItemClick(e, val) {
        // ovveride me
    }

}, {
    propTypes : {
        onChange : PropTypes.func
    },

    defaultProps : {
    },
    childContextTypes : {
        menuValue : PropTypes.any,
        _onItemClick : PropTypes.func
    }
});
