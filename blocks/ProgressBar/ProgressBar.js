import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';
import Stylable from 'b:Stylable';

export default decl([Stylable], {
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
        return { ...this.__base(arguments), timing };
    }
}, {
    propTypes : {
        value : PropTypes.number,
        timing : PropTypes.string
    }
});
