import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';

export default decl({
    block : 'Menu',
    elem : 'Item',

    willInit() {
        this._onClick = this._onClick.bind(this);
    },

    mods({ value }) {
        const values = [].concat(this.context.menuValue);
        return { checked : Boolean(~values.indexOf(value)) };
    },

    attrs() {
        return { onClick : this._onClick };
    },

    _onClick(e) {
        this.context._onItemClick(e, this.props.value);
    }
}, {
    propTypes : {
    },

    defaultProps : {
    },
    contextTypes : {
        menuValue : PropTypes.any,
        _onItemClick : PropTypes.func
    }
});

