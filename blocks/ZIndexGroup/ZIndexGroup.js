import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';

export default decl({
    block : 'ZIndexGroup',

    attrs({ level }) {
        return { style : { zIndex : (level || 1) * 1000 } };
    },

    getChildContext() {
        return {
            zIndexGroup : this.props.level,
            zIndexGroupStyle : {
                zIndex : (this.props.level || 1) * 1000
            }
        };
    },

    render() {
        return this.block === 'ZIndexGroup' ?
            this.props.children :
            this.__base(...arguments);
    }
}, {
    childContextTypes : {
        zIndexGroup : PropTypes.number,
        zIndexGroupStyle : PropTypes.object
    }
});
