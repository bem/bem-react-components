import {decl} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';

export default decl({
    block : 'Popup',

    willInit({ focused, disabled }) {
    },

    willReceiveProps({ focused, disabled }) {
    },

    didMount() {
    },

    didUpdate() {
    },

    mods() {
    },

    attrs({ visible }) {
        return visible? {} : { 'aria-hidden' : 'true' };
    }
}, {
    propTypes : {
        visible : React.PropTypes.bool,
        onVisibleChange : React.PropTypes.func,
    },

    defaultProps : {
        visible : false,
        onVisibleChange() {}
    }
});
