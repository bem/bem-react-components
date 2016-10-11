import {decl} from 'bem-react-core';
import React from 'React';
import Focusable from '../../Focusable/Focusable';

export default decl({
    block : 'TextInput',

    elem : 'Control',

    willInit() {
        this._onChange = this._onChange.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    },

    tag : 'input',

    attrs({ id, name, maxLength, tabIndex, placeholder, autoComplete, type, value, disabled }) {
        let res = {
            id,
            name,
            maxLength,
            tabIndex,
            placeholder,
            type,
            value,
            disabled,
            onChange : this._onChange
        };

        autoComplete === false && (res.autoComplete = 'off');

        return res;
    },

    render() {
        const { focused, onFocus, onBlur } = this.props;
        return (
            <Focusable focused={!!focused} onFocus={this._onFocus} onBlur={this._onBlur}>
                { this.__base.apply(this, arguments) }
            </Focusable>
        );
    },

    _onChange({ target }) {
        this.props.onChange(target.value);
    },

    _onFocus() {
        this.props.onFocusChange(true);
    },

    _onBlur() {
        this.props.onFocusChange(false);
    }
});
