import React from 'React';
import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';
import CheckBox from 'b:CheckBox';

export default decl({
    block : 'CheckBoxGroup',
    elem : 'Option',

    render() {
        const {
                _checkBoxGroupName : name,
                _checkBoxGroupType : type,
                _checkBoxGroupValue : groupValue,
                _checkBoxGroupDisabled : groupDisabled
            } = this.context,
            { value, text, title, disabled } = this.props;

        return (<CheckBox
            name={name}
            type={type}
            text={text}
            title={title}
            checked={groupValue.indexOf(value) > -1}
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
        _checkBoxGroupName : PropTypes.string,
        _checkBoxGroupType : PropTypes.string,
        _checkBoxGroupValue : PropTypes.array,
        _checkBoxGroupDisabled : PropTypes.bool
    }
});
