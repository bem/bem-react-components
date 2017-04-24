import { declMod } from 'bem-react-core';
import PropTypes from 'prop-types';
import React from 'react';

export default declMod(({ target }) => target === 'position', {
    block : 'Popup',

    _calcTargetDimensions : function() {
        const { position } = this.props;
        return {
            left : position.left,
            top : position.top,
            width : 0,
            height : 0
        };
    }
}, {
    propTypes : {
        position : PropTypes.object // TODO left, top
    }
});
