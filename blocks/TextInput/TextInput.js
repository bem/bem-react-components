import Bem, { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';
import Stylable from 'b:Stylable';
import TextInputControl from 'e:Control';
import TextInputClear from 'e:Clear';

export default decl([Stylable], {
    block : 'TextInput',

    willInit({ type, focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        this.state = { focused };

        this._onClearClick = this._onClearClick.bind(this);
        this._onControlFocusChange = this._onControlFocusChange.bind(this);
    },

    willReceiveProps({ focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        typeof focused !== 'undefined' && this.setState({ focused });
    },

    tag : 'span',

    mods({ type, disabled }) {
        const { focused } = this.state;
        return {
            ...this.__base(...arguments),
            type,
            disabled,
            focused
        };
    },

    content(props) {
        return (
            <Bem elem="Box" tag="span">
                <TextInputControl
                    {...props}
                    focused={this.state.focused}
                    onFocusChange={this._onControlFocusChange}/>
                { props.hasClear &&
                    <TextInputClear
                        visible={!!String(props.value)}
                        onClick={props.disabled || this._onClearClick}/>
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
        id : PropTypes.string,
        name : PropTypes.string,
        value : PropTypes.any,
        type : PropTypes.oneOf(['text', 'password', 'search']),
        maxLength : PropTypes.number,
        tabIndex : PropTypes.number,
        placeholder : PropTypes.string,
        autoComplete : PropTypes.bool,
        hasClear : PropTypes.bool,
        disabled : PropTypes.bool,
        focused : PropTypes.bool,
        onFocusChange : PropTypes.func,
        onChange : PropTypes.func.isRequired
    },

    defaultProps : {
        type : 'text',
        value : '',
        onFocusChange() {}
    }
});
