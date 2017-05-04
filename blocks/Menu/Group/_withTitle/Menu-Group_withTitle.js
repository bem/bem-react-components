import React from 'react';
import Bem, { declMod } from 'bem-react-core';

export default declMod(({ title }) => title, {
    block : 'Menu',
    elem : 'Group',

    attrs() {
        return {
            ...this.__base(...arguments),
            'aria-label' : undefined,
            'aria-labelledby' : this.generateId()
        };
    },

    content({ title, children }) {
        return [
            <Bem
                elem="GroupTitle"
                attrs={{ role : 'presentation', id : this.generateId() }}
                key="group">
                    {title}
            </Bem>,
            children
        ]
    }
});

