import {decl} from 'bem-react-core';
import ReactDom from 'react-dom';
import TextInputControl from 'b:TextInput e:Control';

export default decl(TextInputControl, {
    block : 'TextArea',

    elem : 'Control',

    tag : 'textarea'
});
