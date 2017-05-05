import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';

export default decl({
    block : 'Popup',
    elem : 'Content',

    shouldUpdate(nextProps, nextState, nextContext) {
        return !nextContext._popupInRedraw;
    }

    // TODO: do this when it will be possible to return not only one React element
    // render() {
        // return this.props.children;
    // }
}, {
    contextTypes : {
        _popupInRedraw : PropTypes.bool
    }
});
