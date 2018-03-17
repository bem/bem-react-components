import { decl } from 'bem-react-core';
import React from 'react';
import Control from 'e:Control';

export default decl({
    block : 'Attach',
    elem : 'Switcher',

    tag : 'span',

    content({ onChange, children }) {
        return [
            children,
            <Control key="control" onChange={onChange}/>
        ];
    }
});
