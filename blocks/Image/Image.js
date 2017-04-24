import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';

export default decl({
    block : 'Image',
    tag : 'img',
    attrs({ url, alt, width, height }) {
        return { alt, width, height, src : url };
    }
}, {
    propTypes : {
        url : PropTypes.string,
        alt : PropTypes.string,
        width : PropTypes.number,
        height : PropTypes.number
    }
});
