import {declMod} from 'bem-react-core';
import React from 'react';

export default declMod(({ type }) => type === 'link', {
    block : 'Button',

    mods({ type }) {
        return { ...this.__base.apply(this, arguments), type };
    },

    tag : 'a',

    attrs({ target, disabled, url }) {
        const res = {
            ...this.__base.apply(this, arguments),
            target,
            role : 'link'
        };

        disabled?
            res['aria-disabled'] = 'true' :
            res.href = url;

        return res;
    },

    _onClick() {
        this.__base.apply(this, arguments);

        document.location = this.props.url;
    }
});
