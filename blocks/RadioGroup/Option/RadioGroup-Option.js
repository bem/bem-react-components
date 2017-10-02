import React from 'React';
import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';
import Radio from 'b:Radio';

export default decl({
    block : 'RadioGroup',
    elem : 'Option',

    didMount() {
        this.context._radioGroupRegisterOption(this);
    },

    willUnmount() {
        this.context._radioGroupUnregisterOption(this);
    },

    render() {
        const {
                _radioGroupName : name,
                _radioGroupType : type,
                _radioGroupMode : mode,
                _radioGroupValue : groupValue,
                _radioGroupDisabled : groupDisabled,
                _radioGroupTheme : groupTheme,
                _radioGroupSize : groupSize
            } = this.context,
            { value, text, title, disabled } = this.props;

        return (<Radio
            name={name}
            type={type === 'button'? type : undefined}
            mode={mode}
            text={text}
            title={title}
            value={value}
            theme={groupTheme}
            size={groupSize}
            onFocusChange={this.context._radioGroupOnOptionFocusChange}
            onChange={this.context._radioGroupOnOptionChange}
            checked={this._checked = groupValue === value}
            disabled={disabled || groupDisabled}/>);
    }
}, {
    propTypes : {
        value : PropTypes.any,
        text : PropTypes.string,
        title : PropTypes.string,
        disabled : PropTypes.bool
    },

    contextTypes : {
        _radioGroupName : PropTypes.string,
        _radioGroupType : PropTypes.oneOf([undefined, 'button', 'line']),
        _radioGroupMode : PropTypes.oneOf([undefined, 'radio-check']),
        _radioGroupValue : PropTypes.any,
        _radioGroupDisabled : PropTypes.bool,
        _radioGroupTheme : PropTypes.string,
        _radioGroupSize : PropTypes.string,
        _radioGroupRegisterOption : PropTypes.func,
        _radioGroupUnregisterOption : PropTypes.func,
        _radioGroupOnOptionChange : PropTypes.func,
        _radioGroupOnOptionFocusChange : PropTypes.func
    }
});
