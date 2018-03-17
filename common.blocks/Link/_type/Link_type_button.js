import { declMod } from 'bem-react-core';

export default declMod({ type : 'button' }, {
    block : 'Link',

    willInit({ focused }) {
        this.__base(...arguments);

        this.state.pressed = false;
        this.state.focused = focused? 'hard' : false;

        this._isMousePressed = false;

        this._onMouseDown = this._onMouseDown.bind(this);
        this._onMouseUp = this._onMouseUp.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyUp = this._onKeyUp.bind(this);
    },

    willReceiveProps({ focused, disabled }) {
        this.__base(...arguments);

        const newState = {};

        disabled && (newState.pressed = false);

        typeof focused !== 'undefined' &&
            (newState.focused = focused? this.state.focused || 'hard' : false);

        this.setState(newState);
    },

    mods({ type }) {
        return {
            ...this.__base(...arguments),
            type,
            pressed : this.state.pressed
        };
    },

    attrs({ disabled }) {
        const res = this.__base(...arguments);

        if(!disabled) {
            res.onMouseDown = this._onMouseDown;
            res.onMouseUp = this._onMouseUp;

            if(this.state.focused) {
                res.onKeyDown = this._onKeyDown;
                res.onKeyUp = this._onKeyUp;
            }
        }

        return res;
    },

    _onFocus() {
        this.state.focused || this.setState(
            { focused : this._isMousePressed? true : 'hard' },
            () => this.props.onFocusChange(true));
    },

    _onMouseLeave() {
        this.__base(...arguments);

        this._isMousePressed = false;
        this.setState({ pressed : false });
    },

    _onMouseDown(e) {
        this._isMousePressed = true;
        e.button === 0 && this.setState({ pressed : true });
    },

    _onMouseUp() {
        if(this._isMousePressed) {
            this._isMousePressed = false;
            this._focus();
            this.setState({ pressed : false });
        }
    },

    _onKeyDown(e) {
        if(e.key === ' ' || e.key === 'Enter')
            this.setState({ pressed : true });
    },

    _onKeyUp(e) {
        if(this.state.pressed) {
            this.setState({ pressed : false });

            if(e.key === ' ') {
                this.props.onClick(e);
                e.isDefaultPrevented() || (document.location = this.props.url);
            }
        }
    }
});
