import React from 'react';
import Bem, { declMod } from 'bem-react-core';

export default declMod(({ title }) => title, {
    block : 'Menu',
    elem : 'Group',

    attrs() {
        return {
            ...this.__base(...arguments),
            'aria-label' : undefined,
            'aria-labelledby' : '' // TODO: use generateId() https://github.com/bem/bem-react-core/issues/97
        };
    },

    content({ title, children }) {
        return [
            <Bem
                block={this} // TODO: fix
                elem="GroupTitle"
                attrs={{ role : 'presentation', id : '' }}
                key="group">
                    {title}
            </Bem>,
            children
        ]
    }
});

