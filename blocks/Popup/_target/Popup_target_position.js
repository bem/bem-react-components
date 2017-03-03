import {declMod} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';

export default declMod(({ target }) => target === 'position', {
    block : 'Popup',

    _calcTargetDimensions : function() {
        return {
            left : 0,
            top : 0,
            width : 0,
            height : 0
        };
    }
}, {
    propTypes : {
        position : React.PropTypes.object, // TODO left, top
    }
});
