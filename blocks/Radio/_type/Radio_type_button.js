import { declMod } from 'bem-react-core';
import React from 'react';
import Button from 'b:Button';
import RadioControl from 'e:Control';

export default declMod({ type : 'button' }, {
    block : 'Radio',

    willInit() {
        this.__base(...arguments);
        this._onCheckChange = this._onCheckChange.bind(this);
    },

    mods({ type }) {
        return { ...this.__base(...arguments), type };
    },

    content({ checked, disabled, name, value, mode, title, text, icon, theme, size }) {
        return [
            <Button
                key="button"
                togglable={mode === 'radio-check'? 'check' : 'radio'}
                role="checkbox"
                checked={checked}
                disabled={disabled}
                title={title}
                text={text}
                icon={icon}
                theme={theme}
                size={size}
                focused={this.state.focused}
                onFocusChange={this._onControlFocusChange}
                onCheckChange={this._onCheckChange}/>,
            <RadioControl
                key="control"
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}/>
        ];
    },

    _onCheckChange() {
        this.props.onChange(!this.props.checked, this.props.value);
    },

    /**
     * @override
     * The handler is invoked inside asynchronous callback of `setState()` of Button,
     * so `onFocusChange` must be called synchronously
     */
    _onControlFocusChange(focused) {
        this.setState({ focused });
        this.props.onFocusChange(focused);
    }
});
