import { declMod } from 'bem-react-core';

export default declMod({ mode : 'radio-check' }, {
    block : 'RadioGroup',

    _onOptionChange(checked, value) {
        checked?
            this.__base(...arguments) :
            this.props.onChange(undefined);
    }
});
