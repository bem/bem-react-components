import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';

export default decl({
    block : 'ProgressBar',
    style({ value }) {
        return {
            width : value <= 0 ?
                '0' :
                value >= 1 ?
                    '100%' :
                    (value * 100).toPrecision(2) + '%'
        };
    },
    mods({ timing }) {
        return { timing };
    }
}, {
    propTypes : {
        value : PropTypes.number,
        timing : PropTypes.string
    }
});
