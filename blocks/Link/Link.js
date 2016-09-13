import {decl} from 'bem-react-core';
import React from 'react';
import ReactDom from 'react-dom';
import warning from 'warning';

export default decl({
    block : 'Link',

    willInit({ focused, disabled }) {
        warning(!(focused && disabled), 'Can\'t have both "focused" and "disabled" props.');

        this.state = { focused, hovered : false };

        this._onClick = this._onClick.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);
    },

    willReceiveProps({ focused, disabled }) {
        warning(!(focused && disabled), 'Can\'t have both "focused" and "disabled" props.');

        const newState = {};

        disabled && (newState.hovered = false);

        typeof focused !== 'undefined' && (newState.focused = focused);

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

    mods({ disabled }) {
        const { focused, hovered } = this.state;
        return {
            disabled,
            focused,
            hovered
        };
    },

    tag : 'a',

    attrs({ tabIndex, title, url, target, disabled }) {
        let res = {
            role : 'link',
            title,
            target
        };

        if(disabled) {
            res['aria-disabled'] = 'true';
        } else {
            if(url) {
                res.href = url;
            } else {
                tabIndex || (tabIndex = 0);
            }

            res = {
                ...res,
                onClick : this._onClick,
                onFocus : this._onFocus,
                onBlur : this._onBlur,
                onMouseEnter : this._onMouseEnter,
                onMouseLeave : this._onMouseLeave
            };
        }

        res.tabIndex = tabIndex;

        return res;
    },

    _onClick(e) {
        this.props.onClick(e);
    },

    _onFocus() {
        this.state.focused || this.setState(
            { focused : true },
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
        this.setState({ hovered : false });
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
        onClick : React.PropTypes.func,
        onFocusChange : React.PropTypes.func
    },

    defaultProps : {
        onClick() {},
        onFocusChange() {}
    }
});
