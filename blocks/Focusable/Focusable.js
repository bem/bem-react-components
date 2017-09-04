import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import warning from 'warning';

export default decl({
    block : 'Focusable',

    willInit(props) {
        this._warning(props);

        this.state || (this.state = {});
        this.state.focused = props.focused? 'hard' : false;

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
    },

    willReceiveProps(props) {
        const { focused, disabled } = props;

        this._warning(props);

        const newState = {};

        disabled && (newState.hovered = newState.pressed = false);

        typeof focused !== 'undefined' &&
            (newState.focused = focused? this.state.focused || 'hard' : false);

        this.setState(newState);
    },

    _warning({ focused, disabled }) {
        warning(
            !(focused && disabled),
            `${this.__self.displayName}: Can't have both "focused" and "disabled" props.`);
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

    mods() {
        console.log('Focusable mods', this.state);
        return {
            ...this.__base(...arguments),
            focused : this.state.focused
        };
    },

    _onFocusChange(focused) {
        focused?
            this._onFocus() :
            this._onBlur();
    },

    _onFocus() {
        this.state.focused || this.setState(
            { focused : this._isMousePressed? true : 'hard' }, // TODO: move to Button
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
        focused : PropTypes.bool,
        onFocusChange : PropTypes.func
    },

    defaultProps : {
        onFocusChange() {}
    }
});
