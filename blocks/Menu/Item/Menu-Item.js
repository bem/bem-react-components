import {decl} from 'bem-react-core';
import React from 'react';

export default decl({
    block : 'Menu',
    elem : 'Item',
    mods({ value }) {
        return { checked : value === this.context.menuValue };
    }
}, {
    propTypes : {
    },

    defaultProps : {
    },
    contextTypes : {
        menuValue : React.PropTypes.any
    }
});

