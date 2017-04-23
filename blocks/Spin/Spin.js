import {PropTypes} from 'react';
import {decl} from 'bem-react-core';

export default decl({
    block: 'Spin',
    mods({size, progress}) {
        return {size, progress};
    }
}, {
    propTypes: {
        progress: PropTypes.bool
    }
});
