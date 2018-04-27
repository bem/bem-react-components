import { decl } from 'bem-react-core';
import Stylable from 'b:Stylable';

export default decl([Stylable], {
    block : 'Icon',
    tag : 'span',
    attrs({ url }) {
        if(url) return { style : { backgroundImage : `url(${url})` } };
    }
});
