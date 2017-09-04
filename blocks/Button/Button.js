import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import React from 'react';
import Focusable from 'b:Focusable';
import Stylable from 'b:Stylable';
import ButtonText from 'e:Text';

export default decl([Stylable, Focusable], {
    block : 'Button',

    willInit() {
        this.__base(...arguments);

        this.state = {
            ...this.state,
            hovered : false,
            pressed : false
        };

        this._isMousePressed = false;

        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseClick = this._onMouseClick.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
    },

    mods({ disabled, checked }) {
        console.log('Button mods', this.state);
        const { hovered, pressed } = this.state;
        return {
            ...this.__base(...arguments),
            disabled,
            hovered,
            pressed,
            checked
        };
    },

    tag : 'button',

    attrs({ id, tabIndex, title, disabled, togglable, checked, role }) {
        const props = this.props;
        let res = {
            ref : ref => this._domNode = ref,
            role,
            disabled,
            tabIndex,
            id,
            title,
            onClick : this._onMouseClick,
            'aria-owns' : props['aria-owns'],
            'aria-multiselectable' : props['aria-multiselectable'],
            'aria-labelledby' : props['aria-labelledby'],
            'aria-haspopup' : props['aria-haspopup'],
            'aria-controls' : props['aria-controls'],
            'aria-expanded' : props['aria-expanded']
        };

        if(!disabled) {
            res = {
                ...res,
                onFocus : this._onFocus,
                onBlur : this._onBlur,
                onMouseEnter : this._onMouseEnter,
                onMouseLeave : this._onMouseLeave,
                onMouseDown : this._onMouseDown,
                onMouseUp : this._onMouseUp
            };

            if(this.state.focused)
                res = {
                    ...res,
                    onKeyDown : this._onKeyDown,
                    onKeyUp : this._onKeyUp
                };

        }

        togglable && (res[`aria-${role === 'checkbox'? 'checked' : 'pressed'}`] = String(!!checked));

        return res;
    },

    content({ children, icon, text }) {
        if(children) return children;

        const content = [];
        icon && content.push(React.cloneElement(icon, { key : 'icon' }));
        text && content.push(<ButtonText key="button">{text}</ButtonText>);
        return content;
    },

    _onMouseEnter() {
        this.setState({ hovered : true });
    },

    _onMouseLeave() {
        this._isMousePressed = false;
        this.setState({ hovered : false, pressed : false });
    },

    _onMouseDown(e) {
        this._isMousePressed = true;
        e.button === 0 && this.setState({ pressed : true });
    },

    _onMouseUp() {
        if(this._isMousePressed) {
            this._isMousePressed = false;
            this._focus();
            this.setState(
                { pressed : false },
                () => this._onCheck());
        }
    },

    _onMouseClick(e) {
        if(this.props.disabled)
            e.preventDefault();

        else
            this._onClick(e);

    },

    _onKeyDown(e) {
        if(e.key === ' ' || e.key === 'Enter')
            this.setState({ pressed : true });

    },

    _onKeyUp() {
        if(this.state.pressed)
            this.setState(
                { pressed : false },
                () => this._onCheck());

    },

    _onCheck() {
        this.props.togglable &&
            (this.props.togglable === 'radio'?
                this.props.checked || this.props.onCheckChange(true) :
                this.props.onCheckChange(!this.props.checked));

    },

    _onClick(e) {
        this.props.onClick(e);
    }
}, {
    propTypes : {
        type : PropTypes.oneOf(['link']),
        role : PropTypes.oneOf(['button', 'checkbox', 'listbox']),
        icon : PropTypes.element,
        disabled : PropTypes.bool,
        onClick : PropTypes.func,
        onCheckChange : PropTypes.func
    },

    defaultProps : {
        role : 'button',
        onClick() {},
        onCheckChange() {}
    }
});
