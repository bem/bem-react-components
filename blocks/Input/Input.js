import Bem, {decl} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';
import warning from 'warning';
import InputControl from 'e:Control';

export default decl({
    willInit({ focused, disabled }) {
        warning(!(focused && disabled), 'Can\'t have both "focused" and "disabled" props.');

        this.state = { focused };

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    },

    block : 'Input',

    tag : 'span',

    mods({ type, disabled }) {
        const { focused } = this.state;
        return {
            type,
            disabled,
            focused
        };
    },

    content({ value, focused, disabled, onChange }) {
        return (
            <Bem block={this} elem="Box" tag="span">
                <InputControl
                    value={value}
                    focused={focused}
                    disabled={disabled}
                    onChange={onChange}
                />
            </Bem>
        );
    },

    _onFocus() {},

    _onBlur() {}
}, {
    propTypes : {
        disabled : React.PropTypes.bool,
        focused : React.PropTypes.bool,
        onFocusChange : React.PropTypes.func,
        onChange : React.PropTypes.func
    },

    defaultProps : {
        onFocusChange() {},
        onChange() {}
    }
});
