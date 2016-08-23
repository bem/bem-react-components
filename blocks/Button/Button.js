import {decl} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';
import warning from 'warning';
import ButtonText from 'e:Text';

export default decl({
    willInit({ focused, disabled }) {
        this.state = {
            focused : focused? 'hard' : false,
            hovered : false,
            pressed : false
        };

        warning(!(focused && disabled), 'Can\'t have both "focused" and "disabled" props.');

        this._isMousePressed = false;

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
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

    block : 'Button',

    tag : 'button',

    mods({ disabled }) {
        const { focused, hovered, pressed } = this.state;
        return {
            disabled,
            focused,
            hovered,
            pressed
        };
    },

    attrs({ id, tabIndex, title, disabled }) {
        let res = {
            role : 'button',
            'aria-disabled' : disabled,
            disabled,
            tabIndex,
            id,
            title
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

        return res;
    },

    content({ children, icon, text }) {
        if(children) return children;
        const content = [];
        icon && content.push(React.cloneElement(icon, { key : 'icon' }));
        text && content.push(<ButtonText key="button">{text}</ButtonText>);
        return content;
    },

    _onFocus() {
        if(!this.state.focused) {
            this.setState(
                { focused : this._isMousePressed? true : 'hard' },
                this.props.onFocus && (() => this.props.onFocus()));
        }
    },

    _onBlur() {
        this.setState({ focused : false });
        this.props.onBlur && this.props.onBlur();
    },

    _onMouseEnter() {
        this.setState({ hovered : true });
    },

    _onMouseLeave() {
        this._isMousePressed = false;
        this.setState({
            hovered : false,
            pressed : false
        });
    },

    _onMouseDown(e) {
        this._isMousePressed = true;
        e.button === 0 && this.setState({ pressed : true });
    },

    _onMouseUp() {
        if(this._isMousePressed) {
            this._isMousePressed = false;
            this.setState(
                {
                    pressed : false,
                    focused : this.state.focused || true
                },
                () => this._onClick());
        }
    },

    _onKeyDown(e) {
        (e.key === ' ' || e.key === 'Enter') && this.setState({ pressed : true });
    },

    _onKeyUp() {
        if(this.state.pressed) {
            this.setState(
                { pressed : false },
                () => this._onClick());
        }
    },

    _onClick() {
        this.props.onClick && this.props.onClick();
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
        disabled : React.PropTypes.bool,
        focused : React.PropTypes.bool,
        onFocus : React.PropTypes.func,
        onBlur : React.PropTypes.func,
    }
});
