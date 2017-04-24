import Bem, { decl } from 'bem-react-core';
import React from 'react';
import warning from 'warning';
import TextInputControl from 'e:Control';
import 'e:Clear';

export default decl({
    block : 'TextInput',

    willInit({ type, focused, disabled }) {
        warning(!(focused && disabled), 'Can\'t have both "focused" and "disabled" props.');

        this.state = { focused };

        this._onClearClick = this._onClearClick.bind(this);
        this._onControlFocusChange = this._onControlFocusChange.bind(this);
    },

    willReceiveProps({ focused }) {
        typeof focused !== 'undefined' && this.setState({ focused });
    },

    tag : 'span',

    mods({ type, disabled }) {
        const { focused } = this.state;
        return {
            type,
            disabled,
            focused
        };
    },

    content(props) {
        return (
            <Bem block={this} elem="Box" tag="span">
                <TextInputControl
                    {...props}
                    focused={this.state.focused}
                    onFocusChange={this._onControlFocusChange}/>
                { props.hasClear &&
                    <Bem
                        block={this}
                        elem="Clear"
                        tag="i"
                        mods={{ visible : !!String(props.value) }}
                        attrs={props.disabled || { onClick : this._onClearClick }}/>
                }
            </Bem>
        );
    },

    _onControlFocusChange(focused) {
        this.setState({ focused },
            () => this.props.onFocusChange(focused));
    },

    _onClearClick() {
        this._onControlFocusChange(true);
        this.props.onChange('');
    }
}, {
    propTypes : {
        id : React.PropTypes.string,
        name : React.PropTypes.string,
        value : React.PropTypes.any,
        type : React.PropTypes.oneOf(['text', 'password', 'search']),
        maxLength : React.PropTypes.number,
        tabIndex : React.PropTypes.number,
        placeholder : React.PropTypes.string,
        autoComplete : React.PropTypes.bool,
        hasClear : React.PropTypes.bool,
        disabled : React.PropTypes.bool,
        focused : React.PropTypes.bool,
        onFocusChange : React.PropTypes.func,
        onChange : React.PropTypes.func
    },

    defaultProps : {
        type : 'text',
        value : '',
        onFocusChange() {},
        onChange() {}
    }
});
