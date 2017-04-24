import PropTypes from 'prop-types';
import React from 'react';
import { decl } from 'bem-react-core';

const ZINDEX_FACTOR = 1000;

export default decl({
    block : 'ZIndexGroup',

    getChildContext() {
        return {
            zIndexGroup : this.props.level,
            zIndexGroupStyle : {
                zIndex : (this.props.level || 1) * ZINDEX_FACTOR
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
