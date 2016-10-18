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

    _onCheckChange() {
        this.props.onChange(!this.props.checked);
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
    }
});
