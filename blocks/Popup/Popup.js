import {decl} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';
import Portal from 'e:Portal';

export default decl({
    block : 'Popup',

    willInit() {
        this._wasVisible = false;
        this._onDomNodeRef = this._onDomNodeRef.bind(this);
    },

    willReceiveProps({ visible }) {

    },

    didMount() {
        this._domNode = document.createElement('div');
        document.body.appendChild(this._domNode);

        this.trueRender = true;
        ReactDom.unstable_renderSubtreeIntoContainer(this, this.render(), this._domNode);
        this.trueRender = false;
    },

    didUpdate() {
        if (this.props.visible || this._wasVisible) {
            this._wasVisible = true;
        }

        console.log('===', this.mods(this.props));

        this.trueRender = true;
        ReactDom.unstable_renderSubtreeIntoContainer(this, this.render(), this._domNode);
        this.trueRender = false;

    },

    mods({ visible }) {
        console.log('vvvvv', visible);

        return {
            visible
        };
    },

    attrs({ visible }) {
        const attrs = {
            ref: this._onDomNodeRef
        };

        attrs.id = 'bla';
        visible || (attrs['aria-hidden'] = 'true');

        return attrs;
    },

    render() {
        if(this.trueRender) return this.__base();

        return null;
    },

    _onDomNodeRef(ref) {
        this._domNode = ref;
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
