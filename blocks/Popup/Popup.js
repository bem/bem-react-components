import {decl} from 'bem-react-core';
import React from 'react';
import Portal from 'e:Portal';

export default decl({
    block : 'Popup',

    willInit() {
        this._wasVisible = false;
    },

    willReceiveProps({ visible }) {

    },

    didUpdate() {
    },

    mods({ visible }) {
        return {
            visible
        };
    },

    attrs({ visible }) {
        return visible? {} : { 'aria-hidden' : 'true' };
    },

    render() {
        if (this.props.visible || this._wasVisible) {
            this._wasVisible = true;
            return <Portal>{this.__base()}</Portal>
        } else {
            return this.__base();
        }
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
