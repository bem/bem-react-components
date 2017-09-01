import React from 'react';
import { declMod } from 'bem-react-core';
import Link from 'b:Link m:pseudo';

export default declMod({ switcher : 'link' }, {
    block : 'Dropdown',

    content({ tabIndex, disabled, text, opened, focused, theme, size, onFocusChange }) {
        return [
            <Link
                pseudo
                key="link"
                mix={{ block : this.block, elem : 'switcher' }}
                ref={this._anchorRef}
                tabIndex={tabIndex}
                theme={theme}
                size={size}
                disabled={disabled}
                onClick={this._onSwitcherClick}
                focused={focused}
                onFocusChange={onFocusChange}
                aria-haspopup="true"
                aria-controls={this._id}
                aria-expanded={String(Boolean(opened))}>
                {text}
            </Link>,
            this.__base(...arguments)
        ];
    }
});
