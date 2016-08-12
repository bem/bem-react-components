import {decl} from 'bem-react-core';
import React from 'react';

export default decl({
    block : 'Icon',
    tag : 'span',
    attrs({ url }) {
        if(url) return { style : { backgroundImage: `url(${url})` } };
    }
});
