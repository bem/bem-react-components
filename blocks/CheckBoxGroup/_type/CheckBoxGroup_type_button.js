import { declMod } from 'bem-react-core';
import 'b:CheckBox m:type=button';

export default declMod({ type : 'button' }, {
    block : 'CheckBoxGroup',

    content() {
        return this.props.children;
    }
});
