import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import React from 'react';
import warning from 'warning';
import Stylable from 'b:Stylable';
import Hoverable from 'b:Hoverable';
import ButtonText from 'e:Text';

export default decl([Stylable], {
    block : 'Button',

    willInit({ focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        this.state = {
            focused : focused? 'hard' : false,
            pressed : false
        };

        this._isMousePressed = false;

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onMouseClick = this._onMouseClick.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
    },

    willReceiveProps({ focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

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
        const { focused, pressed } = this.state;
        return {
            ...this.__base(...arguments),
            disabled,
            focused,
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

    _onMouseLeave() {
        this._isMousePressed = false;
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
    },

    _focus() {
        document.activeElement !== this._domNode && this._domNode.focus();
    },

    _blur() {
        document.activeElement === this._domNode && this._domNode.blur();
    }
}, {
    propTypes : {
        type : PropTypes.oneOf(['link']),
        role : PropTypes.oneOf(['button', 'checkbox', 'listbox']),
        icon : PropTypes.element,
        disabled : PropTypes.bool,
        focused : PropTypes.bool,
        onClick : PropTypes.func,
        onFocusChange : PropTypes.func,
        onCheckChange : PropTypes.func
    },

    defaultProps : {
        role : 'button',
        onClick() {},
        onFocusChange() {},
        onCheckChange() {}
    }
});

decl({
    block : 'Button',

    mods({ hovered }) {
        return {
            ...this.__base(...arguments),
            hovered
        };
    },

    attrs({ onMouseEnter, onMouseLeave }) {
        return {
            ...this.__base(...arguments),
            onMouseEnter,
            onMouseLeave
        };
    }

}, Button => Hoverable.connect(Button));
