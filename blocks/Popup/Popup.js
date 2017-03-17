import {decl} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';
import Portal from 'e:Portal';

export default decl({
    block : 'Popup',

    willInit() {
        this._wasVisible = false;
        this._onDomNodeRef = this._onDomNodeRef.bind(this);
        this.isVisible = this.isVisible.bind(this);
    },

    getChildContext() {
        return {
            isParentLayerVisible: this.isVisible
        };
    },

    mods({ visible }) {
        return {
            visible
        };
    },

    attrs({ visible }) {
        const attrs = {
            ref: this._onDomNodeRef
        };

        visible || (attrs['aria-hidden'] = 'true');

        return attrs;
    },

    render() {
        if (this.props.visible || this._wasVisible) {
            this._wasVisible = true;
            return <Portal>
                {this.__base()}
            </Portal>
        } else {
            return this.__base();
        }
    },

    didUpdate() {
        const { isParentLayerVisible } = this.context;

        this.isVisible() &&
            typeof isParentLayerVisible === 'function' &&
            isParentLayerVisible() === false &&
            this.props.requestHide();
    },

    isVisible() {
        return this.props.visible;
    },

    _onDomNodeRef(ref) {
        this._domNode = ref;
    }
}, {
    propTypes : {
        visible : React.PropTypes.bool,
        onVisibleChange : React.PropTypes.func,
        requestHide: React.PropTypes.func
    },

    childContextTypes: {
        isParentLayerVisible: React.PropTypes.func
    },

    contextTypes: {
        isParentLayerVisible: React.PropTypes.func
    },

    defaultProps : {
        visible : false,
        onVisibleChange() {}
    }
});
