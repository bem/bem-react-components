import {decl} from 'bem-react-core';

export default decl({
    willInit() {
        this._onChange = this._onChange.bind(this);
    },

    block : 'Input',

    elem : 'Control',

    tag : 'input',

    attrs({ type, value, disabled }) {
        const res = {
            type,
            value,
            disabled,
            onChange : this._onChange
        };

        return res;
    },

    _onChange({ target }) {
        this.props.onChange(target.value);
    }
});
