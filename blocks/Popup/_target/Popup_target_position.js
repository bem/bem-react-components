import {declMod} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';

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
        position : React.PropTypes.object, // TODO left, top
    }
});
