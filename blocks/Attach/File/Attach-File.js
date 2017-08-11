import React from 'react';
import Bem, { decl } from 'bem-react-core';

export default decl({
    block : 'Attach',
    elem : 'File',

    tag : 'span',

    content({ value, onClearClick }) {
        return [
            <Bem key="text" tag="span" elem="text">{extractFileNameFromPath(value)}</Bem>,
            <Bem
                key="clear"
                tag="span"
                elem="clear"
                attrs={{ onClick : onClearClick }}>
                X
            </Bem>
        ];
    }
});

function extractFileNameFromPath(path) {
    return path.split('\\').pop(); // we need this only in windows
}
