import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import 'm:withValue';
import warning from 'warning';

export default decl({
    block : 'Menu',
    elem : 'Item',

    willInit({ focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        this.state = { focused, hovered : false };

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onMouseMove = this._onMouseMove.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);

        this._idx = null;
    },

    willReceiveProps({ focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        const newState = {};

        disabled && (newState.hovered = false);

        typeof focused !== 'undefined' && (newState.focused = focused);

        this.setState(newState);
    },

    didMount() {
        this.state.focused?
            this._focus() :
            this._blur();

        this._idx = this.context._menuRegisterItem(this);
    },

    willUnmount() {
        this.context._menuUnregisterItem(this);
    },

    didUpdate() {
        this.state.focused?
            this._focus() :
            this._blur();
    },

    mods({ disabled }) {
        const { focused, hovered } = this.state;
        return { disabled : disabled || this.context._menuDisabled, focused, hovered };
    },

    attrs({ id, tabIndex, disabled }) {
        const menuMode = this.context._menuMode;
        let res = {
            id,
            ref : ref => this._domNode = ref,
            role : (menuMode?
                (menuMode === 'check'? 'menuitemcheckbox' : 'menuitemradio') :
                'menuitem')
        };

        if(disabled)
            res['aria-disabled'] = 'true';
        else {
            tabIndex || (tabIndex = 0);

            res = {
                ...res,
                onFocus : this._onFocus,
                onBlur : this._onBlur,
                // MouseMove because of combining mouse & keyboard hovering
                onMouseMove : this._onMouseMove,
                onMouseLeave : this._onMouseLeave
            };
        }

        res.tabIndex = tabIndex;

        return res;
    },

    setHovered(hovered) {
        this.setState({ hovered });
    },

    getText() {
        return this._domNode.innerText;
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

    _onMouseMove() {
        this.context._menuHoverItem(this._idx);
    },

    _onMouseLeave() {
        this.context._menuHoverItem();
    },

    _focus() {
        document.activeElement !== this._domNode && this._domNode.focus();
    },

    _blur() {
        document.activeElement === this._domNode && this._domNode.blur();
    }
}, {
    contextTypes : {
        _menuDisabled : PropTypes.bool,
        _menuMode : PropTypes.string,
        _menuRegisterItem : PropTypes.func,
        _menuUnregisterItem : PropTypes.func,
        _menuHoverItem : PropTypes.func
    },

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

