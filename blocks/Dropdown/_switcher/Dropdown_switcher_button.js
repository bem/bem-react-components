import React from 'react';
import { declMod } from 'bem-react-core';
import Button from 'b:Button';

export default declMod({ switcher : 'button' }, {
    block : 'Dropdown',

    content({ tabIndex, disabled, text, opened, focused, onFocusChange }) {
        return [
            <Button
                key="button"
                mix={{ block : this.block, elem : 'switcher' }}
                ref={this._anchorRef}
                tabIndex={tabIndex}
                disabled={disabled}
                onClick={this._onSwitcherClick}
                focused={focused}
                onFocusChange={onFocusChange}
                aria-haspopup="true"
                aria-controls={this._id}
                aria-expanded={String(Boolean(opened))}>
                {text}
            </Button>,
            this.__base(...arguments)
        ];
    }
});
