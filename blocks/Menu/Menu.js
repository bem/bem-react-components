import {decl} from 'bem-react-core';
import React from 'react';

export default decl({
    block : 'Menu',

    getChildContext() {
        return { menuValue : this.props.value };
    }
}, {
    propTypes : {
    },

    defaultProps : {
    },
    childContextTypes : {
        menuValue : React.PropTypes.any
    }
});
