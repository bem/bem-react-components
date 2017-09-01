import React, { Children } from 'React';
import PropTypes from 'prop-types';
import warning from 'warning';
import Stylable from 'b:Stylable';
import { decl } from 'bem-react-core';

export default decl([Stylable], {
    block : 'CheckBoxGroup',

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
        const { name, type, value, disabled, theme, size } = this.props;
        return {
            _checkBoxGroupName : name,
            _checkBoxGroupType : type,
            _checkBoxGroupValue : value,
            _checkBoxGroupDisabled : disabled,
            _checkBoxGroupTheme : theme,
            _checkBoxGroupSize : size,
            _checkBoxGroupRegisterOption : this._registerOption.bind(this),
            _checkBoxGroupOnOptionChange : this._onOptionChange.bind(this),
            _checkBoxGroupOnOptionFocusChange : this._onOptionFocusChange.bind(this)
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
        this.props.onChange(this._options.reduce((res, option) => {
            (option.props.value === value? checked : option._checked) &&
                res.push(option.props.value);
            return res;
        }, []));
    },

    _onOptionFocusChange(focused) {
        this.setState({ focused },
            () => this.props.onFocusChange(focused));
    }

}, {
    propTypes : {
        name : PropTypes.string,
        type : PropTypes.oneOf([undefined, 'button', 'line']),
        value : PropTypes.array,
        disabled : PropTypes.bool,
        onChange : PropTypes.func.isRequired,
        onFocusChange : PropTypes.func
    },

    defaultProps : {
        value : [],
        onFocusChange() {}
    },

    childContextTypes : {
        _checkBoxGroupName : PropTypes.string,
        _checkBoxGroupType : PropTypes.string,
        _checkBoxGroupValue : PropTypes.array,
        _checkBoxGroupDisabled : PropTypes.bool,
        _checkBoxGroupTheme : PropTypes.string,
        _checkBoxGroupSize : PropTypes.string,
        _checkBoxGroupRegisterOption : PropTypes.func,
        _checkBoxGroupOnOptionChange : PropTypes.func,
        _checkBoxGroupOnOptionFocusChange : PropTypes.func
    }
});
