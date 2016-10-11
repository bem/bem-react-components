import {decl} from 'bem-react-core';
import React, {PropTypes} from 'React';
import Focusable from '../Focusable/Focusable';
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
                onMouseEnter : this._onMouseEnter,
                onMouseLeave : this._onMouseLeave
            };
        }

        res.tabIndex = tabIndex;

        return res;
    },

    render() {
        return (
            <Focusable focused={!!this.state.focused} onFocus={this._onFocus} onBlur={this._onBlur}>
                { this.__base.apply(this, arguments) }
            </Focusable>
        );
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
    }
}, {
    propTypes : {
        disabled : PropTypes.bool,
        focused : PropTypes.bool,
        onClick : PropTypes.func,
        onFocusChange : PropTypes.func
    },

    defaultProps : {
        onClick() {},
        onFocusChange() {}
    }
});
