import { declMod } from 'bem-react-core';
import 'b:Radio m:type=button';

export default declMod({ type : 'button' }, {
    block : 'RadioGroup',

    content() {
        return this.props.children;
    }
});
