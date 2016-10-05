import {declMod} from 'bem-react-core';
import React from 'react';

export default declMod(({ pseudo }) => pseudo, {
    block : 'Link',

    willInit() {
        this.__base.apply(this, arguments);
        this._onKeyDown = this._onKeyDown.bind(this);
    },

    mods({ pseudo }) {
        return { ...this.__base.apply(this, arguments), pseudo };
    },

    tag({ url }) {
        return url? 'a' : 'span';
    },

    attrs({ url }) {
        const res = this.__base.apply(this, arguments);

        url || (res.role = 'button');

        this.state.focused && (res.onKeyDown = this._onKeyDown);

        return res;
    },

    _onClick(e) {
        e.preventDefault();

        this.__base.apply(this, arguments);
    },

    _onKeyDown : function(e) {
        e.key === 'Enter' && this._onClick(e);
    }
});
