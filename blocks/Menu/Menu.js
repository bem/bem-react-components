import { decl } from 'bem-react-core';
import PropTypes from 'prop-types';
import warning from 'warning';
import Stylable from 'b:Stylable';
import KeyCodes from 'b:KeyCodes';

const TIMEOUT_KEYBOARD_SEARCH = 1500;

export default decl([Stylable], {
    block : 'Menu',

    willInit({ focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        this.state = { focused };
        this._id = this.generateId();

        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onKeyPress = this._onKeyPress.bind(this);

        this._registeredItems = [];
        this._registerMenuItem = this._registerMenuItem.bind(this);
        this._unregisterMenuItem = this._unregisterMenuItem.bind(this);
        this._hoverItem = this._hoverItem.bind(this);

        this._lastTyping = {
            idx : 0,
            text : '',
            char : '',
            time : 0
        };
    },

    willReceiveProps({ focused, disabled }) {;
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        const newState = {};
        if(typeof focused !== 'undefined') {
            newState.focused = focused;
            this.setState(newState);
        }
    },

    didMount() {
        this.state.focused? this._focus() : this._blur();
    },

    didUpdate() {
        this.state.focused? this._focus() : this._blur();
    },

    getChildContext() {
        return {
            _menuDisabled : this.props.disabled,
            _menuMode : this.props.mode,
            _menuRegisterItem : this._registerMenuItem,
            _menuUnregisterItem : this._unregisterMenuItem,
            _menuHoverItem : this._hoverItem
        };
    },

    mods({ disabled }) {
        return {
            ...this.__base(...arguments),
            disabled,
            focused : this.state.focused
        };
    },

    attrs({ tabIndex, disabled }) {
        let res = {
            ref : ref => this._domNode = ref,
            role : 'menu'
        };

        if(disabled)
            res['aria-disabled'] = 'true';
        else {
            this.props.hasOwnProperty('tabIndex') || (tabIndex = 0);

            res = {
                ...res,
                onFocus : this._onFocus,
                onBlur : this._onBlur,
                onKeyPress : this._onKeyPress,
                onKeyDown : this._onKeyDown
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

    _onKeyDown(e) {
        if(!e.shiftKey && KeyCodes.is(e.keyCode, 'UP', 'DOWN')) {
            e.preventDefault();

            const len = this._registeredItems.length,
                hoveredIdx = this._registeredItems.indexOf(this._hoveredItem),
                dir = e.keyCode - 39; // using the features of key codes for "up"/"down" ;-)
            let nextIdx = hoveredIdx,
                i = 0;

            do {
                nextIdx += dir;
                nextIdx = nextIdx < 0? len - 1 : nextIdx >= len? 0 : nextIdx;
                if(++i === len) return; // if we have no next item to hover
            } while(this._registeredItems[nextIdx].props.disabled);

            this._lastTyping.idx = nextIdx;

            this._hoverItem(nextIdx);
        }
    },

    searchItemIdxByKeyboardEvent(e) {
        const currentTime = +new Date(),
            charCode = e.charCode,
            char = String.fromCharCode(charCode).toLowerCase(),
            lastTyping = this._lastTyping,
            isSameChar = char === lastTyping.char && lastTyping.text.length === 1,
            items = this._registeredItems;

        if(charCode <= KeyCodes.SPACE || e.ctrlKey || e.altKey || e.metaKey) {
            lastTyping.time = currentTime;
            return null;
        }

        if(currentTime - lastTyping.time > TIMEOUT_KEYBOARD_SEARCH || isSameChar)
            lastTyping.text = char;
        else
            lastTyping.text += char;


        lastTyping.char = char;
        lastTyping.time = currentTime;

        let idx = lastTyping.idx;

        // If key is pressed again, then continue to search to next menu item
        if(isSameChar && items[idx].getText().search(lastTyping.char) === 0)
            idx = idx >= items.length - 1? 0 : idx + 1;


        // 2 passes: from idx to items.length and from 0 to idx.
        let i = idx, len = items.length;
        while(i < len) {
            if(this._doesItemMatchText(items[i], lastTyping.text)) {
                lastTyping.idx = i;
                return i;
            }

            i++;

            if(i === items.length) {
                i = 0;
                len = idx;
            }
        }

        return null;
    },

    _doesItemMatchText(item, text) {
        return !item.props.disabled &&
            item.getText().toLowerCase().search(text) === 0;
    },

    _onKeyPress(e) {
        const itemIdx = this.searchItemIdxByKeyboardEvent(e);
        itemIdx !== null && this._hoverItem(itemIdx);
    },

    _focus() {
        document.addEventListener('keydown', this._onKeyDown);
        document.addEventListener('keypress', this._onKeyPress);
        // TODO: call _onFocus as in
        // https://github.com/bem/bem-components/blob/v6/common.blocks/control/control.js#L99-L101
        document.activeElement !== this._domNode && this._domNode.focus();
    },

    _blur() {
        document.removeEventListener('keydown', this._onKeyDown);
        document.removeEventListener('keypress', this._onKeyPress);
        document.activeElement === this._domNode && this._domNode.blur();
    },

    _registerMenuItem(item) {
        return (this._registeredItems.push(item) - 1);
    },

    _unregisterMenuItem(item) {
        this._hoveredItem === item && (this._hoveredItem = null);
        return this._registeredItems.splice(this._registeredItems.indexOf(item), 1);
    },

    _hoverItem(idx) {
        if(this._hoveredItem !== this._registeredItems[idx]) {
            this._hoveredItem && this._hoveredItem.setHovered(false);
            this._hoveredItem = this._registeredItems[idx];
            this._hoveredItem && this._hoveredItem.setHovered(true);
        }
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
    },

    childContextTypes : {
        _menuDisabled : PropTypes.bool,
        _menuItemsIndex : PropTypes.object,
        _menuMode : PropTypes.string,
        _menuRegisterItem : PropTypes.func,
        _menuUnregisterItem : PropTypes.func,
        _menuHoverItem : PropTypes.func
    }
});
