import React, { Children } from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import Stylable from 'b:Stylable';
import { decl } from 'bem-react-core';

export default decl([Stylable], {
    block : 'RadioGroup',

    willInit({ focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        this.state = { focused };

        this._options = [];
    },

    willReceiveProps({ focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        typeof focused !== 'undefined' && this.setState({ focused });
    },

    getChildContext() {
        const { name, type, mode, value, disabled, theme, size } = this.props;
        return {
            _radioGroupName : name,
            _radioGroupType : type,
            _radioGroupMode : mode,
            _radioGroupValue : value,
            _radioGroupDisabled : disabled,
            _radioGroupTheme : theme,
            _radioGroupSize : size,
            _radioGroupRegisterOption : this._registerOption.bind(this),
            _radioGroupOnOptionChange : this._onOptionChange.bind(this),
            _radioGroupOnOptionFocusChange : this._onOptionFocusChange.bind(this)
        };
    },

    mods({ type, disabled }) {
        const { focused } = this.state;
        return { ...this.__base(...arguments), type, disabled, focused };
    },

    content({ children, type }) {
        const res = [];

        Children.forEach(children, (option, i) => {
            i && !type && res.push(<br key={i}/>);
            res.push(option);
        });

        return res;
    },

    _registerOption(option) {
        this._options.push(option);
    },

    _onOptionChange(checked, value) {
        this.props.onChange(value);
    },

    _onOptionFocusChange(focused) {
        this.setState({ focused },
            () => this.props.onFocusChange(focused));
    }

}, {
    propTypes : {
        name : PropTypes.string,
        type : PropTypes.oneOf([undefined, 'button', 'line']),
        mode : PropTypes.oneOf([undefined, 'radio-check']),
        value : PropTypes.any,
        disabled : PropTypes.bool,
        onChange : PropTypes.func.isRequired,
        onFocusChange : PropTypes.func
    },

    defaultProps : {
        value : [],
        onFocusChange() {}
    },

    childContextTypes : {
        _radioGroupName : PropTypes.string,
        _radioGroupType : PropTypes.oneOf([undefined, 'button', 'line']),
        _radioGroupMode : PropTypes.oneOf([undefined, 'radio-check']),
        _radioGroupValue : PropTypes.any,
        _radioGroupDisabled : PropTypes.bool,
        _radioGroupTheme : PropTypes.string,
        _radioGroupSize : PropTypes.string,
        _radioGroupRegisterOption : PropTypes.func,
        _radioGroupOnOptionChange : PropTypes.func,
        _radioGroupOnOptionFocusChange : PropTypes.func
    }
});
