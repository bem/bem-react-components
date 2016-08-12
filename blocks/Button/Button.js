import {decl} from 'bem-react-core';
import React from 'react';
import ButtonText from 'e:Text';

export default decl({
    block : 'Button',
    tag : 'button',
    attrs({ id, tabIndex, title, disabled }) {
        return {
            role : 'button',
            'aria-disabled' : disabled,
            disabled,
            tabIndex,
            id,
            title
        };
    },
    content({ children, icon, text }) {
        if(children) return children;
        const content = [];
        icon && content.push(React.cloneElement(icon, { key : 'icon' }));
        text && content.push(<ButtonText key="button">{text}</ButtonText>);
        return content;
    }
});
