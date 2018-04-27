import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import React from 'react';
import Stylable from 'b:Stylable';
import Portal from 'e:Portal';
import Content from 'e:Content';

const ZINDEX_FACTOR = 1000,
    visibleLayersZIndexes = {};

export default decl([Stylable], {
    block : 'Popup',

    willInit() {
        this.state = { zIndex : null };

        this._isClickInside = false;
        this._wasVisible = false;

        this._onDomNodeRef = this._onDomNodeRef.bind(this);
        this.isVisible = this.isVisible.bind(this);
        this._setClickInside = this._setClickInside.bind(this);
    },

    getChildContext() {
        return {
            _popupParentSetClickInside : this._setClickInside,
            isParentLayerVisible : this.isVisible,
            zIndexGroup : this.props.zIndexGroup
        };
    },

    mods({ visible }) {
        return { ...this.__base(...arguments), visible };
    },

    attrs({ visible, role }) {
        const attrs = {
            ref : this._onDomNodeRef,
            role,
            style : { zIndex : this.state.zIndex }
        };

        visible ?
            attrs.onClick = this._setClickInside :
            attrs['aria-hidden'] = 'true';

        return attrs;
    },

    render() {
        if(this.props.visible || this._wasVisible) {
            this._wasVisible = true;
            return <Portal>{this.__base()}</Portal>;
        } else
            return this.__base();

    },

    content() {
        return <Content>{this.__base(...arguments)}</Content>;
    },

    didUpdate() {
        const { isParentLayerVisible } = this.context;

        if(this.isVisible())
            if(typeof isParentLayerVisible === 'function' && isParentLayerVisible() === false) {
                this._releaseZIndex();
                this.props.onHide();
            } else {
                this._captureZIndex();
            }
        else
            this._releaseZIndex();

    },

    isVisible() {
        return this.props.visible;
    },

    _onDomNodeRef(ref) {
        this._domNode = ref;
    },

    _getZIndexes() {
        let level = this._zIndexGroup;
        if(!level) {
            level = this.props.zIndexGroup || 0;
            this.context.zIndexGroup && (level += this.context.zIndexGroup);
        }
        return visibleLayersZIndexes[level] ||
            (visibleLayersZIndexes[level] = [(level || 1) * ZINDEX_FACTOR]);
    },

    _captureZIndex() {
        if(this.state.zIndex) return;
        const zIndexes = this._getZIndexes(),
            zIndex = zIndexes[zIndexes.push(zIndexes[zIndexes.length - 1] + 1) - 1];
        this.setState({ zIndex });
    },

    _releaseZIndex() {
        if(!this.state.zIndex) return;
        const zIndexes = this._getZIndexes(),
            idx = zIndexes.indexOf(this.state.zIndex);
        if(idx > -1) {
            zIndexes.splice(idx, 1);
            this.setState({ zIndex : null });
        }
    },

    _setClickInside() {
        this._isClickInside = true;
        this.context._popupParentSetClickInside &&
            this.context._popupParentSetClickInside();
    }
}, {
    propTypes : {
        visible : PropTypes.bool,
        onHide : PropTypes.func
    },

    childContextTypes : {
        _popupParentSetClickInside : PropTypes.func,
        isParentLayerVisible : PropTypes.func,
        zIndexGroup : PropTypes.number
    },

    contextTypes : {
        _popupParentSetClickInside : PropTypes.func,
        isParentLayerVisible : PropTypes.func,
        zIndexGroup : PropTypes.number
    },

    defaultProps : {
        visible : false,
        onHide() {
            throw Error('Popup: onHide prop must be defined');
        }
    }
});
