import Bem, { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';
import RadioControl from 'e:Control';

export default decl({
    block : 'Radio',

    willInit({ focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        this.state = { focused };

        this._onControlFocusChange = this._onControlFocusChange.bind(this);
    },

    willReceiveProps({ focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        typeof focused !== 'undefined' && this.setState({ focused });
    },

    tag : 'label',

    mods({ type, disabled }) {
        const { focused } = this.state;
        return { type, disabled, focused };
    },

    attrs({ title }) {
        return { title };
    },

    content(props) {
        return (
            <Bem elem="Box" tag="span">
                <RadioControl
                    {...props}
                    focused={this.state.focused}
                    onFocusChange={this._onControlFocusChange}/>
                { props.text &&
                    <Bem
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
        id : PropTypes.string,
        name : PropTypes.string,
        value : PropTypes.any,
        checked : PropTypes.bool,
        text : PropTypes.string,
        title : PropTypes.string,
        type : PropTypes.oneOf([undefined, 'button']),
        mode : PropTypes.oneOf([undefined, 'radio-check']),
        tabIndex : PropTypes.number,
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
