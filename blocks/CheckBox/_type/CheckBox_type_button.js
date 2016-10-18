import {declMod} from 'bem-react-core';
import React from 'react';
import Button from 'b:Button';
import CheckBoxControl from 'e:Control';

export default declMod(({ type }) => type === 'button', {
    block : 'CheckBox',

    willInit() {
        this.__base.apply(this, arguments);
        this._onCheckChange = this._onCheckChange.bind(this);
    },

    mods({ type }) {
        return { ...this.__base.apply(this, arguments), type };
    },

    content({ checked, disabled, name, value, title, text, icon }) {
        return [
            <Button
                key="button"
                togglable="check"
                role="checkbox"
                checked={checked}
                disabled={disabled}
                title={title}
                text={text}
                icon={icon}
                focused={this.state.focused}
                onFocusChange={this._onControlFocusChange}
                onCheckChange={this._onCheckChange}
            />,
            <CheckBoxControl
                key="control"
                name={name}
                value={value}
                checked={checked}
                disabled={disabled}
            />
         ];
    },

    _onCheckChange() {
        this.props.onChange(!this.props.checked);
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
