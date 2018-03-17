import React from 'react';
import { declMod } from 'bem-react-core';
import Control from 'b:Select e:Control';
import 'b:Menu m:mode=check';

export default declMod({ mode : 'check' }, {
    block : 'Select',

    willInit() {
        this.__base(...arguments);

        this._checkedOptions = [];
    },

    _renderControl() {
        const { name, disabled } = this.props;

        return this._checkedOptions.length ? this._checkedOptions.map(option =>
            <Control
                name={name}
                disabled={disabled}
                value={option.value}
                key={option.text}/>
        ) : '';
    },

    _getButtonText(value) {
        const checkedOptions = this._checkedOptions = value.map(val => this._textByValue[val]);

        this.setState({ buttonChecked : Boolean(checkedOptions.length) });

        return checkedOptions.length === 1?
            checkedOptions[0].text : // one checked
            checkedOptions.reduce((res, item) =>
                res + (res? ', ' : '') + (item.checkedText || item.text), '') ||
                this.props.text; // many checked
    }
});
