import Bem, { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import React from 'react';
import Focusable from 'b:Focusable';
import Stylable from 'b:Stylable';
import CheckBoxControl from 'e:Control';

export default decl([Focusable, Stylable], {
    block : 'CheckBox',

    willInit({ focused, disabled }) {
        this._onControlFocusChange = this._onControlFocusChange.bind(this);
    },

    tag : 'label',

    mods({ type, disabled }) {
        return { ...this.__base(...arguments), type, disabled };
    },

    attrs({ title }) {
        return { title };
    },

    content(props) {
        return (
            <Bem elem="Box" tag="span">
                <CheckBoxControl
                    {...props}
                    focused={this.state.focused}
                    onFocusChange={this._onFocusChange}/>
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
        tabIndex : PropTypes.number,
        disabled : PropTypes.bool,
        onChange : PropTypes.func.isRequired
    },

    defaultProps : {
        value : ''
    }
});
