import { declMod } from 'bem-react-core';
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'b:Button';
import Switcher from 'e:Switcher';

export default declMod({ switcher : 'button' }, {
    block : 'Attach',

    content({ text, icon, theme, size }) {
        return [
            <Switcher onChange={this._onChange} key="switcher">
                <Button
                    theme={theme}
                    size={size}
                    key="button"
                    mix={{ block : this.block, elem : 'button' }}
                    icon={icon}>
                    {text}
                </Button>
            </Switcher>,
            this.__base(...arguments)
        ];
    }
}, {
    propTypes : {
        icon : PropTypes.element
    }
});
