import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { decl } from 'bem-react-core';
import warning from 'warning';
import Stylable from 'b:Stylable';
import KeyCodes from 'b:KeyCodes';
import Button from 'b:Button';
import Popup from 'b:Popup m:autoclosable m:target=anchor';
import Menu from 'b:Menu';
import Option from 'e:Option';
import Group from 'e:Group';

export default decl([Stylable], {
    block : 'Select',

    willInit({ focused, disabled }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        this.state = {
            focused,
            buttonText : this.props.text
        };

        this._id = this.generateId();
        this._optionIdsByValue = {};
        this._optionIds = [];

        this._onMenuChange = this._onMenuChange.bind(this);
        this._onButtonClick = this._onButtonClick.bind(this);
        this._buttonRef = this._buttonRef.bind(this);
        this._popupRef = this._popupRef.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onBlur = this._onBlur.bind(this);
        this._onKeyDown = this._onKeyDown.bind(this);
        this._onDocumentMouseDown = this._onDocumentMouseDown.bind(this);
    },

    willReceiveProps({ children, focused, disabled, opened }) {
        warning(!(focused && disabled), `${this.block}: Can't have both "focused" and "disabled" props.`);

        const newState = {};

        if(typeof focused !== 'undefined') {
            newState.focused = focused;
            this.setState(newState);
        }
    },

    didMount() {
        this.state.focused? this._focus() : this._blur();

        document.addEventListener('mousedown', this._onDocumentMouseDown);

        this._getOptionsParams({ children : this.props.children });
    },

    didUnmount() {
        document.removeEventListener('mousedown', this._onDocumentMouseDown);
    },

    didUpdate() {
        this.state.focused? this._focus() : this._blur();
    },

    mods({ disabled }) {
        return {
            ...this.__base(...arguments),
            disabled,
            focused : this.state.focused
        };
    },

    attrs({ tabIndex, disabled, name }) {
        let res = {
            name,
            ref : ref => this._domNode = ref
        };

        if(!disabled) {
            tabIndex || (tabIndex = 0);

            res = {
                ...res,
                onFocus : this._onFocus,
                onBlur : this._onBlur,
                onKeyDown : this._onKeyDown
            };
        }

        return res;
    },

    getChildContext() {
        return { _optionIdsByValue : this._optionIdsByValue };
    },

    content({ mode, text, opened, onClose, value, tabIndex, disabled, theme, size, children }) {
        const { block } = this;

        return [
            this._renderControl(),
            <Button
                key="button"
                role="listbox"
                mix={{ block, elem : 'Button' }}
                ref={this._buttonRef}
                tabIndex={tabIndex}
                disabled={disabled}
                theme={theme}
                size={size}
                onClick={this._onButtonClick}
                checked={this.state.buttonChecked}
                aria-owns={this._optionIds.join(' ')}
                aria-multiselectable={mode === 'check'? 'true' : undefined}
                aria-labelledby={this._id}>
                {this.state.buttonText}
            </Button>,
            <Popup
                key="popup"
                mix={{ block, elem : 'popup' }}
                theme={theme}
                size={size}
                target="anchor"
                anchor={this._buttonRef}
                ref={this._popupRef}
                autoclosable
                onHide={onClose}
                visible={opened}>
                <Menu
                    mix={{ block, elem : 'menu' }}
                    theme={theme}
                    size={size}
                    disabled={disabled}
                    tabIndex={undefined}
                    focused={opened}
                    mode={mode}
                    value={value}
                    onChange={this._onMenuChange}>
                    {children}
                </Menu>
            </Popup>
        ];
    },

    _onFocus() {
        this.state.focused || this.setState(
            { focused : true },
            () => this.props.onFocusChange(true));
    },

    _onBlur() {
        this.setState(
            { focused : false },
            () => {
                this.props.onFocusChange(false);
                this.props.onClose();
            });
    },

    _onMenuChange(value) {
        this.setState({ buttonText : this._getButtonText(value) });
        this.props.onChange(value);
    },

    _onButtonClick() {
        const { opened, onClose, onOpen } = this.props;
        opened ? onClose() : onOpen();
    },

    _onKeyDown(e) {
        const { opened, onOpen } = this.props;
        opened || e.shiftKey || KeyCodes.is(e.keyCode, 'UP', 'DOWN') && onOpen();
    },

    _onDocumentMouseDown(e) {
        // prevents button blur in most desktop browsers
        if(this._popup._domNode.contains(e.target))
            e.preventDefault();
    },

    _getOptionsParams({ children }) {
        const textByValue = this._textByValue = {},
            optionIdsByValue = this._optionIdsByValue,
            optionIds = this._optionIds,
            selectId = this._id;

        (function getOptProps(options) {
            Children.forEach(options, option => {
                if(isElem(option, Option)) {
                    const { props : { value, children : text, checkedText, id } } = option;

                    if(optionIdsByValue.hasOwnProperty(value))
                        throw Error('Select: You can\'t have two options with same value');

                    textByValue[value] = { text , checkedText, value };
                    optionIds.push(optionIdsByValue[value] = id || selectId + str2hash(value));
                } else if(isElem(option, Group))
                    getOptProps(option.props.children);
            });
        })(children);
    },

    _focus() {
        document.activeElement !== this._domNode && this._domNode.focus();
    },

    _blur() {
        document.activeElement === this._domNode && this._domNode.blur();
    },

    _buttonRef(button) {
        if(button) this._button = button;
        else return this._button;
    },

    _popupRef(popup) {
        return this._popup || (this._popup = popup);
    }
}, {
    propTypes : {
        mode : PropTypes.oneOf(['radio', 'check', 'radio-check']),
        disabled : PropTypes.bool,
        focused : PropTypes.bool,
        onFocusChange : PropTypes.func,
        opened : PropTypes.bool.isRequired,
        onOpen : PropTypes.func.isRequired,
        onClose : PropTypes.func.isRequired
    },

    defaultProps : {
        onFocusChange() {}
    },

    childContextTypes : {
        _optionIdsByValue : PropTypes.object
    }
});

// TODO: use core method https://github.com/bem/bem-react-core/issues/121
function isElem({ type : { prototype : { block, elem } } }, Elem) {
    return block === Elem.prototype.block &&
        elem === Elem.prototype.elem;
}

function str2hash(str) {
    str = String(str);
    let hash = 0;
    if(str)
        for(var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
            hash = hash & hash; // Convert to 32bit integer
        }

    return hash;
}
