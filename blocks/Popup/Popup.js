import {decl} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';
import Portal from 'e:Portal';

const visibleLayersZIndexes = {};

export default decl({
    block : 'Popup',

    willInit() {
        this._wasVisible = false;
        this._onDomNodeRef = this._onDomNodeRef.bind(this);
        this.isVisible = this.isVisible.bind(this);
    },

    getChildContext() {
        return {
            isParentLayerVisible: this.isVisible,
            zIndexGroupLevel: this.props.zIndexGroupLevel
        };
    },

    mods({ visible }) {
        return { visible };
    },

    attrs({ visible }) {
        const attrs = { ref: this._onDomNodeRef };

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

    _calcZIndexGroupLevel() {
        let res = this.props.zIndexGroupLevel;
        this.context.zIndexGroupLevel && (res += this.context.zIndexGroupLevel);
        return res;
    },

    _captureZIndex() {
        const level = this._zIndexGroupLevel === null?
                this._zIndexGroupLevel = this._calcZIndexGroupLevel() :
                this._zIndexGroupLevel,
            zIndexes = visibleLayersZIndexes[level] ||
                (visiblePopupsZIndexes[level] = [(level + 1) * ZINDEX_FACTOR]),
            prevZIndex = this._zIndex;
        this._zIndex = zIndexes[zIndexes.push(zIndexes[zIndexes.length - 1] + 1) - 1];
        if (this._zIndex !== prevZIndex) {
            this.props.onOrderChange(this._zIndex, this.props);
        }
    },

    _releaseZIndex() {
        const level = this.context.zIndexGroupLevel || this.props.zIndexGroupLevel;
        const zIndexes = visibleLayersZIndexes[level];
        const idx = zIndexes.indexOf(this.zIndex);
        if (idx > -1) {
            zIndexes.splice(idx, 1);
        }
    }
}, {
    propTypes : {
        visible : React.PropTypes.bool,
        onVisibleChange : React.PropTypes.func,
        requestHide: React.PropTypes.func
    },

    childContextTypes: {
        isParentLayerVisible: React.PropTypes.func,
        zIndexGroupLevel: React.PropTypes.number
    },

    contextTypes: {
        isParentLayerVisible: React.PropTypes.func,
        zIndexGroupLevel: React.PropTypes.number
    },

    defaultProps : {
        visible : false,
        onVisibleChange() {}
    }
});
