import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';
import Stylable from 'b:Stylable';

export default decl([Stylable], {
    block : 'Spin',
    mods({ progress, size }) {
        return { ...this.__base(...arguments), progress, size };
    }
}, {
    propTypes : {
        progress : PropTypes.bool,
        size : PropTypes.oneOf(['xxs', 'xs', 's', 'm', 'l'])
    }
});
