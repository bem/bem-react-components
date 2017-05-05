import React from 'react';
import { declMod } from 'bem-react-core';
import Control from 'b:Select e:Control';
import 'b:Menu m:mode=radio-check';

export default declMod({ mode : 'radio-check' }, {
    block : 'Select',

    _renderControl() {
        const { name, disabled } = this.props;

        return this._checkedOption ? <Control
            name={name}
            disabled={disabled}
            value={this._checkedOption.value}
            key={this._checkedOption.text}/> : '';
    },

    _getButtonText(value) {
        const checkedOption = this._checkedOption = this._textByValue[value];

        this.setState({ buttonChecked : Boolean(value) });

        return checkedOption? checkedOption.text : this.props.text;
    }
});
