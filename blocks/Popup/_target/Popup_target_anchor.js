import {declMod} from 'bem-react-core';
import React from 'react';

export default declMod(({ target }) => target === 'anchor', {
    block : 'Popup'
});
