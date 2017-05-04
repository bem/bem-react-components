import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import warning from 'warning';

export default decl({
    block : 'Menu',

    willInit({ focused, disabled }) {
        warning(!(focused && disabled), 'Can\'t have both "focused" and "disabled" props.');

        this.state = { focused };

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    },

    willReceiveProps({ focused, disabled }) {
        warning(!(focused && disabled), 'Can\'t have both "focused" and "disabled" props.');

        const newState = {};

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
        return { disabled, focused : this.state.focused };
    },

    attrs({ tabIndex, disabled }) {
        let res = {
            ref : ref => this._domNode = ref,
            role : 'menu'
        };

        if(disabled)
            res['aria-disabled'] = 'true';
        else {
            tabIndex || (tabIndex = 0);

            res = {
                ...res,
                onFocus : this._onFocus,
                onBlur : this._onBlur
            };
        }

        res.tabIndex = tabIndex;

        return res;
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

    _focus() {
        document.activeElement !== this._domNode && this._domNode.focus();
    },

    _blur() {
        document.activeElement === this._domNode && this._domNode.blur();
    }

}, {
    propTypes : {
        disabled : PropTypes.bool,
        focused : PropTypes.bool,
        onFocusChange : PropTypes.func
    },

    defaultProps : {
        onClick() {},
        onFocusChange() {}
    }
});
