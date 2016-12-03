import {decl} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';
import warning from 'warning';
import ButtonText from 'e:Text';

export default decl({
    block : 'Button',

    willInit({ focused, disabled }) {
        warning(!(focused && disabled), 'Can\'t have both "focused" and "disabled" props.');

        this.state = {
            focused : focused? 'hard' : false,
            hovered : false,
            pressed : false
        };

        this._isMousePressed = false;
    },

    willReceiveProps({ focused, disabled }) {
        warning(!(focused && disabled), 'Can\'t have both "focused" and "disabled" props.');

        const newState = {};

        disabled && (newState.hovered = newState.pressed = false);

        typeof focused !== 'undefined' &&
            (newState.focused = focused? this.state.focused || 'hard' : false);

        this.setState(newState);
    },

    didMount() {
        this.state.focused?
            this._focus() :
            this._blur();
    },

    didUpdate() {
        this.state.focused?
            this._focus() :
            this._blur();
    },

    mods({ disabled, checked }) {
        const { focused, hovered, pressed } = this.state;
        return {
            disabled,
            focused,
            hovered,
            pressed,
            checked
        };
    },

    tag : 'button',

    attrs({ id, tabIndex, title, disabled, togglable, checked, role }) {
        let res = {
            role,
            'aria-disabled' : disabled,
            disabled,
            tabIndex,
            id,
            title,
            onClick : this._onMouseClick
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

            if(this.state.focused) {
                res = {
                    ...res,
                    onKeyDown : this._onKeyDown,
                    onKeyUp : this._onKeyUp
                };
            }
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

    _onFocus : () => {
        this.state.focused || this.setState(
            { focused : this._isMousePressed? true : 'hard' },
            () => this.props.onFocusChange(true));
    },

    _onBlur : () => {
        this.setState(
            { focused : false },
            () => this.props.onFocusChange(false));
    },

    _onMouseEnter : () => {
        this.setState({ hovered : true });
    },

    _onMouseLeave : () => {
        this._isMousePressed = false;
        this.setState({ hovered : false, pressed : false });
    },

    _onMouseDown : (e) => {
        this._isMousePressed = true;
        e.button === 0 && this.setState({ pressed : true });
    },

    _onMouseUp : () => {
        if(this._isMousePressed) {
            this._isMousePressed = false;
            this._focus();
            this.setState(
                { pressed : false },
                () => this._onCheck());
        }
    },

    _onMouseClick : (e) => {
        if(this.props.disabled) {
            e.preventDefault();
        }
        else {
            this._onClick(e);
        }
    },

    _onKeyDown : (e) => {
        if(e.key === ' ' || e.key === 'Enter') {
            this.setState({ pressed : true });
        }
    },

    _onKeyUp : () => {
        if(this.state.pressed) {
            this.setState(
                { pressed : false },
                () => this._onCheck());
        }
    },

    _onCheck : () => {
        this.props.togglable &&
            (this.props.togglable === 'radio'?
                this.props.checked || this.props.onCheckChange(true) :
                this.props.onCheckChange(!this.props.checked));

    },

    _onClick : (e) => {
        this.props.onClick(e);
    },

    _focus() {
        const domNode = ReactDom.findDOMNode(this);
        document.activeElement !== domNode && domNode.focus();
    },

    _blur() {
        const domNode = ReactDom.findDOMNode(this);
        document.activeElement === domNode && domNode.blur();
    }
}, {
    propTypes : {
        type : React.PropTypes.oneOf(['link']),
        role : React.PropTypes.oneOf(['button', 'checkbox']),
        disabled : React.PropTypes.bool,
        focused : React.PropTypes.bool,
        onClick : React.PropTypes.func,
        onFocusChange : React.PropTypes.func,
        onCheckChange : React.PropTypes.func
    },

    defaultProps : {
        role : 'button',
        onClick() {},
        onFocusChange() {},
        onCheckChange() {}
    }
});
