import { decl } from 'bem-react-core';
import React from 'react';
import Portal from 'e:Portal';

const ZINDEX_FACTOR = 1000,
    visibleLayersZIndexes = {};

export default decl({
    block : 'Popup',

    willInit() {
        this._wasVisible = false;
        this._onDomNodeRef = this._onDomNodeRef.bind(this);
        this.isVisible = this.isVisible.bind(this);
        this.state = { zIndex : null };
    },

    getChildContext() {
        return {
            isParentLayerVisible : this.isVisible,
            zIndexGroup : this.props.zIndexGroup
        };
    },

    mods({ visible }) {
        return { visible };
    },

    attrs({ visible }) {
        const attrs = {
            ref : this._onDomNodeRef,
            style : { zIndex : this.state.zIndex }
        };

        visible || (attrs['aria-hidden'] = 'true');

        return attrs;
    },

    render() {
        if(this.props.visible || this._wasVisible) {
            this._wasVisible = true;
            return <Portal>{this.__base()}</Portal>;
        } else
            return this.__base();

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
    }
}, {
    propTypes : {
        visible : React.PropTypes.bool,
        onVisibleChange : React.PropTypes.func,
        onHide : React.PropTypes.func
    },

    childContextTypes : {
        isParentLayerVisible : React.PropTypes.func,
        zIndexGroup : React.PropTypes.number
    },

    contextTypes : {
        isParentLayerVisible : React.PropTypes.func,
        zIndexGroup : React.PropTypes.number
    },

    defaultProps : {
        visible : false,
        onVisibleChange() {}
    }
});
