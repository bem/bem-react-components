import { decl } from 'bem-react-core';

export default decl({
    block : 'Icon',
    tag : 'span',
    attrs({ url }) {
        if(url) return { style : { backgroundImage : `url(${url})` } };
    }
});
