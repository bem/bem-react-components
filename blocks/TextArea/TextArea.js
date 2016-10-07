import Bem, {decl} from 'bem-react-core';
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
                onFocusChange={this._onControlFocusChange}
            />
        );
    }
}, {
    propTypes : {
        id : React.PropTypes.string,
        name : React.PropTypes.string,
        value : React.PropTypes.any,
        tabIndex : React.PropTypes.number,
        placeholder : React.PropTypes.string,
        autoComplete : React.PropTypes.bool,
        disabled : React.PropTypes.bool,
        focused : React.PropTypes.bool,
        onFocusChange : React.PropTypes.func,
        onChange : React.PropTypes.func
    },

    defaultProps : {
        value : '',
        onFocusChange() {},
        onChange() {}
    }
});
