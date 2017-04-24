import { PropTypes } from 'react';
import { decl } from 'bem-react-core';

export default decl({
    block : 'Spin',
    mods({ progress }) {
        return { progress };
    }
}, {
    propTypes : {
        progress : PropTypes.bool
    }
});
