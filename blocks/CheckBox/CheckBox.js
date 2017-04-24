import Bem, { decl } from 'bem-react-core';
import React from 'react';
import warning from 'warning';
import CheckBoxControl from 'e:Control';

export default decl({
    block : 'CheckBox',

    willInit({ focused, disabled }) {
        warning(!(focused && disabled), 'Can\'t have both "focused" and "disabled" props.');

        this.state = { focused };

        this._onControlFocusChange = this._onControlFocusChange.bind(this);
    },

    willReceiveProps({ focused }) {
        typeof focused !== 'undefined' && this.setState({ focused });
    },

    tag : 'label',

    mods({ type, disabled }) {
        const { focused } = this.state;
        return {
            type,
            disabled,
            focused
        };
    },

    attrs({ title }) {
        return { title };
    },

    content(props) {
        return (
            <Bem block={this} elem="Box" tag="span">
                <CheckBoxControl
                    {...props}
                    focused={this.state.focused}
                    onFocusChange={this._onControlFocusChange}/>
                { props.text &&
                    <Bem
                        block={this}
                        elem="Text"
                        tag="span"
                        attrs={{ role : 'presentation' }}>
                        {props.text}
                    </Bem>
                }
            </Bem>
        );
    },

    _onControlFocusChange(focused) {
        this.setState({ focused },
            () => this.props.onFocusChange(focused));
    }
}, {
    propTypes : {
        id : React.PropTypes.string,
        name : React.PropTypes.string,
        value : React.PropTypes.any,
        checked : React.PropTypes.bool,
        text : React.PropTypes.string,
        title : React.PropTypes.string,
        type : React.PropTypes.oneOf([undefined, 'button']),
        tabIndex : React.PropTypes.number,
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
