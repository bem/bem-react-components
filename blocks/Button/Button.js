import {decl} from 'bem-react-core';
import React, {PropTypes} from 'React';
import Focusable from '../Focusable/Focusable';
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

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
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

    attrs({ id, tabIndex, title, disabled, togglable, checked }) {
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

        togglable && (res['aria-pressed'] = String(!!checked));

        return res;
    },

    render() {
        return (
            <Focusable focused={!!this.state.focused} onFocus={this._onFocus} onBlur={this._onBlur}>
                { this.__base.apply(this, arguments) }
            </Focusable>
        );
    },

    content({ children, icon, text }) {
        if(children) return children;
        const content = [];
        icon && content.push(React.cloneElement(icon, { key : 'icon' }));
        text && content.push(<ButtonText key="button">{text}</ButtonText>);
        return content;
    },

    _onFocus() {
        this.state.focused || this.setState(
            { focused : this._isMousePressed? true : 'hard' },
            () => this.props.onFocusChange(true));
    },

    _onBlur() {
        this.setState(
            { focused : false },
            () => this.props.onFocusChange(false));
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
            this.setState(
                {
                    pressed : false,
                    focused : this.state.focused || true
                },
                () => {
                    this._onCheck();
                    this._onClick();
                });
        }
    },

    _onKeyDown(e) {
        if(e.key === ' ' || e.key === 'Enter') {
            this.setState(
                { pressed : true },
                () => this._onCheck());
        }
    },

    _onKeyUp() {
        if(this.state.pressed) {
            this.setState(
                { pressed : false },
                () => this._onClick());
        }
    },

    _onCheck() {
        this.props.togglable &&
            (this.props.togglable === 'radio'?
                this.props.checked || this.props.onCheckChange(true) :
                this.props.onCheckChange(!this.props.checked));

    },

    _onClick() {
        this.props.onClick();
    }
}, {
    propTypes : {
        type : PropTypes.oneOf([undefined, 'link']),
        disabled : PropTypes.bool,
        focused : PropTypes.bool,
        onClick : PropTypes.func,
        onFocusChange : PropTypes.func,
        onCheckChange : PropTypes.func
    },

    defaultProps : {
        onClick() {},
        onFocusChange() {},
        onCheckChange() {}
    }
});
