import { declMod } from 'bem-react-core';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';

export default declMod(({ target }) => target === 'anchor', {
    block : 'Popup',

    _getAnchorDomNode() {
        if(!this.props.anchor) throw Error('Popup target=anchor: anchor prop is required.');

        const anchor = this.props.anchor();

        return anchor instanceof Element?
            anchor :
            ReactDom.findDOMNode(anchor); // eslint-disable-line react/no-find-dom-node
    },

    _calcTargetDimensions : function() {
        const anchorRect = this._getAnchorDomNode().getBoundingClientRect(),
            viewportRect = document.documentElement.getBoundingClientRect();

        return {
            left : anchorRect.left - viewportRect.left,
            top : anchorRect.top - viewportRect.top,
            width : anchorRect.width,
            height : anchorRect.height
        };
    }

}, {
    propTypes : {
        anchor : PropTypes.func
    }
});

