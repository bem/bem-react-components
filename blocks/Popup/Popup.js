import {decl} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';
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
            isParentLayerVisible: this.isVisible,
            zIndexGroup: this.props.zIndexGroup
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
        if (this.props.visible || this._wasVisible) {
            this._wasVisible = true;
            return <Portal>{this.__base()}</Portal>
        } else {
            return this.__base();
        }
    },

    didUpdate() {
        console.log('didUpdate');
        const { isParentLayerVisible } = this.context;

        if(this.isVisible()) {
            if(typeof isParentLayerVisible === 'function' && isParentLayerVisible() === false) {
                this._releaseZIndex();
                this.props.requestHide();
            } else {
                this._captureZIndex();
            }
        } else {
            this._releaseZIndex();
        }
    },

    isVisible() {
        return this.props.visible;
    },

    _onDomNodeRef(ref) {
        this._domNode = ref;
    },

    _calcZIndexGroup() {
        console.log('_calcZIndexGroup', this.props.zIndexGroup, this.context.zIndexGroup);
        if(this._zIndexGroup) return this._zIndexGroup;

        let res = this.props.zIndexGroup || 0;
        this.context.zIndexGroup && (res += this.context.zIndexGroup);
        return this._zIndexGroup = res;
    },

    _captureZIndex() {
        console.log('_captureZIndex');
        const level = this._calcZIndexGroup(),
            zIndexes = visibleLayersZIndexes[(console.log('level', level), level)] ||
                (visibleLayersZIndexes[level] = [(level + 1) * ZINDEX_FACTOR]),
            prevZIndex = this.state.zIndex,
            zIndex = zIndexes[zIndexes.push(zIndexes[zIndexes.length - 1] + 1) - 1];

        console.log('zIndex', zIndex, prevZIndex, zIndexes);
        zIndex === prevZIndex || this.setState({ zIndex });
    },

    _releaseZIndex() {
        console.log('_releaseZIndex', visibleLayersZIndexes, this._zIndexGroup, this.zIndex);
        const zIndexes = visibleLayersZIndexes[this._calcZIndexGroup()],
            idx = zIndexes.indexOf(this.state.zIndex);
        idx > -1 && zIndexes.splice(idx, 1);
    }
}, {
    propTypes : {
        visible : React.PropTypes.bool,
        onVisibleChange : React.PropTypes.func,
        requestHide: React.PropTypes.func
    },

    childContextTypes: {
        isParentLayerVisible: React.PropTypes.func,
        zIndexGroup: React.PropTypes.number
    },

    contextTypes: {
        isParentLayerVisible: React.PropTypes.func,
        zIndexGroup: React.PropTypes.number
    },

    defaultProps : {
        visible : false,
        onVisibleChange() {}
    }
});
