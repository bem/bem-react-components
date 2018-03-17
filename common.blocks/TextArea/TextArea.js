import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import React from 'react';
import TextInput from 'b:TextInput';
import TextAreaControl from 'e:Control';

export default decl(TextInput, {
    block : 'TextArea',
    content(props) {
        return (
            <TextAreaControl
                {...props}
                focused={this.state.focused}
                onFocusChange={this._onControlFocusChange}/>
        );
    }
}, {
    propTypes : {
        id : PropTypes.string,
        name : PropTypes.string,
        value : PropTypes.any,
        tabIndex : PropTypes.number,
        placeholder : PropTypes.string,
        autoComplete : PropTypes.bool,
        disabled : PropTypes.bool,
        focused : PropTypes.bool,
        onFocusChange : PropTypes.func,
        onChange : PropTypes.func
    },

    defaultProps : {
        value : '',
        onFocusChange() {},
        onChange() {}
    }
});
