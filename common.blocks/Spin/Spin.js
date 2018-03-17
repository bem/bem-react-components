import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';
import Stylable from 'b:Stylable';

export default decl([Stylable], {
    block : 'Spin',
    mods({ progress }) {
        return { ...this.__base(...arguments), progress };
    }
}, {
    propTypes : {
        progress : PropTypes.bool
    }
});
